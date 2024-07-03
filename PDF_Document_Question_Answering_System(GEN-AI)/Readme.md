# PDF Document Question Answering System with LangChain and Cassandra (Gen-AI)

This project demonstrates how to set up a LangChain application that processes PDF files, stores their content in a Cassandra database, and enables querying using Cohere embeddings.

## Prerequisites

Before running the script, make sure you have the following:
- Python 3.8 or later installed.
- Required Python packages installed.
- A `.env` file with the necessary environment variables set.

## Setup

1. **Install the required packages**:
    ```bash
    pip install -r req.txt
    ```

2. **Create a `.env` file** with the following content:
    ```env
    CLIENT_ID=<your_client_id>
    CLIENT_SECRET=<your_client_secret>
    COHERE_API_KEY=<your_cohere_api_key>
    ASTRA_DB_TOKEN=<your_astra_db_token>
    ASTRA_DB_ENDPOINT=<your_astra_db_endpoint>
    ```

3. **Prepare your secure connect bundle**:
    Place the `secure-connect-sumeet.zip` file in the same directory as your script.

4. **Prepare your token JSON file**:
    Place the `sumeet-token.json` file in the same directory as your script. This file should contain:
    ```json
    {
        "clientId": "<your_client_id>",
        "secret": "<your_client_secret>"
    }
    ```

## Additional Feature: Extracting and Summarizing Text from PDFs

This feature allows you to extract text from PDF files and summarize the content using Cohere.

## Notes

- Make sure your Cassandra database and keyspace are set up correctly.
- Adjust the script as necessary to fit your specific use case.

## Troubleshooting

- If you encounter any errors related to database connection, check your secure connect bundle and token file.
- Ensure your environment variables are correctly set in the `.env` file.
