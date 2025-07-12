from sentence_transformers import SentenceTransformer
import joblib
import os

def train_and_save_model():
    model = SentenceTransformer("all-MiniLM-L6-v2")
    model_path = os.path.join(os.path.dirname(__file__), "skill_match_model.pkl")
    joblib.dump(model, model_path)
    print(f"✅ Model trained and saved at {model_path}")

if __name__ == "__main__":
    train_and_save_model()
