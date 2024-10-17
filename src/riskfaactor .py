import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import seaborn as sns


data = [
    {'name': 'John Doe', 'offenseCount': 2, 'offenseIntensity': 7, 'previousConvictions': 2, 'repeatedOffender': True, 'imprisonmentTime': 4, 'flight_risk': 0.85},
    {'name': 'Jane Doe', 'offenseCount': 1, 'offenseIntensity': 4, 'previousConvictions': 0, 'repeatedOffender': False, 'imprisonmentTime': 2, 'flight_risk': 0.40},
    # Add more prisoner records here...
]

# Convert to DataFrame
df = pd.DataFrame(data)

# Credit point system based on predefined logic
def calculate_credit_points(row):
    points = 0
    # Offense Count Credit
    if row['offenseCount'] <= 2:
        points += 1
    elif row['offenseCount'] <= 5:
        points += 2
    else:
        points += 3
    
    # Offense Intensity Credit
    if row['offenseIntensity'] <= 3:
        points += 1
    elif row['offenseIntensity'] <= 6:
        points += 2
    else:
        points += 3
    
    # Previous Convictions Credit
    if row['previousConvictions'] == 0:
        points += 0
    elif row['previousConvictions'] <= 2:
        points += 1
    else:
        points += 2
    
    # Repeated Offender Credit
    if row['repeatedOffender']:
        points += 2  # Add 2 points if a repeated offender
    
    # Imprisonment Time Credit
    if row['imprisonmentTime'] < 1:
        points += 1
    elif row['imprisonmentTime'] <= 3:
        points += 2
    else:
        points += 3
    
    return points

# Apply the function to calculate credit points for each prisoner
df['credit_points'] = df.apply(calculate_credit_points, axis=1)

# Define features and target (flight_risk instead of risk_factor)
X = df[['offenseCount', 'offenseIntensity', 'previousConvictions', 'repeatedOffender', 'imprisonmentTime', 'credit_points']]
y = df['flight_risk']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the Random Forest Regressor
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predict on test data
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse:.2f}")

# 1. Bar chart for feature importance
importances = model.feature_importances_
features = X.columns

# Bar chart for feature importance
plt.figure(figsize=(8, 5))
plt.title('Feature Importance for Flight Risk Prediction')
sns.barplot(x=importances, y=features, palette='viridis')
plt.xlabel('Importance Score')
plt.ylabel('Features')
plt.show()

sample_prisoner = df.iloc[0]  


labels = ['Offense Count', 'Offense Intensity', 'Previous Convictions', 'Repeated Offender', 'Imprisonment Time']
points = [
    1 if sample_prisoner['offenseCount'] <= 2 else 2 if sample_prisoner['offenseCount'] <= 5 else 3,
    1 if sample_prisoner['offenseIntensity'] <= 3 else 2 if sample_prisoner['offenseIntensity'] <= 6 else 3,
    0 if sample_prisoner['previousConvictions'] == 0 else 1 if sample_prisoner['previousConvictions'] <= 2 else 2,
    2 if sample_prisoner['repeatedOffender'] else 0,
    1 if sample_prisoner['imprisonmentTime'] < 1 else 2 if sample_prisoner['imprisonmentTime'] <= 3 else 3
]


plt.figure(figsize=(7, 7))
plt.pie(points, labels=labels, autopct='%1.1f%%', startangle=140, colors=sns.color_palette('Set2'))
plt.title(f"Credit Point Distribution for {sample_prisoner['name']}")
plt.show()

