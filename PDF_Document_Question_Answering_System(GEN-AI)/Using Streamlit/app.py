import streamlit as st
import json
import os
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from langchain.llms import Cohere
from langchain.embeddings import CohereEmbeddings
from langchain.vectorstores.cassandra import Cassandra
from langchain.indexes import VectorstoreIndexCreator
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import PyPDFLoader
from astrapy import DataAPIClient

st.title('PDF Answering System')

# Loading the secrets
with open("sumeet-token.json") as f:
    secrets = json.load(f)

CLIENT_ID = secrets["clientId"]
CLIENT_SECRET = secrets["secret"]

# Setting up Cassandra connection
cloud_config = {'secure_connect_bundle': 'secure-connect-sumeet.zip'}
auth_provider = PlainTextAuthProvider(CLIENT_ID, CLIENT_SECRET)
cluster = Cluster(cloud=cloud_config, auth_provider=auth_provider)
session = cluster.connect()

row = session.execute("select release_version from system.local").one()
if row:
    st.write(f'Cassandra release version: {row[0]}')
else:
    st.write("An error occurred.")

# Setting up LangChain with Cohere
os.environ['COHERE_API_KEY'] = "hokfa1WXJcpedUPjuhYM6GKknMSQvt33DOPJGp6M"
llm = Cohere(model="command-r-plus", temperature=0)
cohere_embeddings = CohereEmbeddings()
table_name = 'pdf_q_n_a_table_1'
keyspace = "default_keyspace"

index_creator = VectorstoreIndexCreator(
    vectorstore_cls=Cassandra,
    embedding=cohere_embeddings,
    text_splitter=RecursiveCharacterTextSplitter(
        chunk_size=400,
        chunk_overlap=30,
    ),
    vectorstore_kwargs={
        'session': session,
        'keyspace': keyspace,
        'table_name': table_name,
    },
)

# Initializing the Astra client
client = DataAPIClient("AstraCS:kiRiFsThesQfHEzDNtBhQXlU:56471216c0b55ec10a5df881b2a570f6f17cc7de7594a4bea3a15028fe2c3653")
db = client.get_database_by_api_endpoint(
    "https://4a1c36e1-80dc-415c-bbba-3d05e2197013-us-east1.apps.astra.datastax.com"
)

st.write(f"Connected to Astra DB")

uploaded_file = st.file_uploader("Choose a PDF file", type="pdf")
if uploaded_file is not None:
    with open("temp.pdf", "wb") as f:
        f.write(uploaded_file.getbuffer())
    st.write("PDF file uploaded successfully")

    # Loading and spliting the PDF
    loader = PyPDFLoader("temp.pdf")
    pages = loader.load_and_split()
    pdf_index = index_creator.from_loaders([loader])

    # Default query example removed
    # default_query = f'SELECT * FROM {keyspace}.{table_name}'
    # rows = session.execute(default_query)
    # for row_i, row in enumerate(rows):
    #     st.write(f'\nRow {row_i}:')
    #     st.write(f'row_id: {row.row_id}')
    #     st.write(f'embedding_vector: {str(row.vector)[:64]} ...')
    #     st.write(f'body_blob: {row.body_blob[:64]} ...')
    #     st.write(f'metadata_blob: {row.metadata_s}')

    st.write('\n...')

    question = st.text_input("Ask a question about the PDF")
    if question:
        
        result = pdf_index.query(question, llm=llm)
        st.write(f"Answer: {result}")
