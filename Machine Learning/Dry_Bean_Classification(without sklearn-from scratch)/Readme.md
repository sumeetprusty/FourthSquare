# Dry Bean Classification

This project implements a K-Nearest Neighbors (KNN) classifier from scratch to classify dry beans into different categories based on their features. The implementation does not use any machine learning libraries like scikit-learn, and is built entirely using basic Python libraries such as NumPy and Pandas.

## Dataset

The dataset used for this project is the Dry Bean Dataset. It contains various features of dry beans along with their respective class labels.

## Steps

1. **Load the Data:**
    - Read the dataset from a CSV file using Pandas.
    - Display summary statistics and check for missing values.

2. **Preprocess the Data:**
    - Map class labels to integers for easier processing.
    - Split the data into training and test sets (70% train, 30% test).
    - Standardize the features to have zero mean and unit variance.

3. **K-Nearest Neighbors Classifier:**
    - Implement the Euclidean distance function.
    - Implement the KNN prediction function which predicts the class of a given test sample based on the majority class of its k-nearest neighbors.

4. **Model Evaluation:**
    - Evaluate the KNN classifier for different values of k (1, 3, 5, 7, 9, 11, 13, 15).
    - Plot the accuracy for different k values.
    - Select the best k based on accuracy.
    - Generate a classification report (precision, recall, F1-score) and confusion matrix.
    - Visualize the confusion matrix.

5. **Sample Predictions:**
    - Predict and display the classes for a random sample of test data.

## Requirements
- Python 3.x
- Pandas
- NumPy
- Matplotlib

## Usage
1. Ensure that the Dry Bean Dataset CSV file is available in the same directory as the script.
2. Run the script using a Python interpreter.

The script will output:
- Summary statistics
- Accuracy for different k values
- Classification report
- Confusion matrix
- Predictions for a random sample of test data

## Notes
- This implementation is done from scratch without using scikit-learn.
- The KNN classifier is simple and might not be the most efficient for very large datasets.
