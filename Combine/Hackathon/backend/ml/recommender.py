from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import joblib
import os

# Path to save/load the model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "skill_match_model.pkl")

# Load trained model or fallback to default
try:
    model = joblib.load(MODEL_PATH)
except FileNotFoundError:
    print("⚠️ Model file not found. Using default pretrained model.")
    model = SentenceTransformer("all-MiniLM-L6-v2")
    joblib.dump(model, MODEL_PATH)

# Function to embed a list of skills
def embed_skills(skills):
    if isinstance(skills, list):
        return model.encode(skills)
    return model.encode([skills])

# Main matching logic with threshold
def match_user(input_skills, users, threshold=0.5):
    input_vecs = embed_skills(input_skills)
    results = []

    for user in users:
        user_skills = user.get("skills_offered", [])
        if not user_skills:
            continue

        user_vecs = embed_skills(user_skills)
        sim_matrix = cosine_similarity(input_vecs, user_vecs)

        best_score = float(np.max(sim_matrix))  # max similarity
        if best_score >= threshold:  # apply threshold
            results.append({
                "user": user,
                "score": round(best_score, 4)
            })

    # Return top matches sorted by score
    return sorted(results, key=lambda x: x["score"], reverse=True)
