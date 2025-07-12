# 🤝 Skill Swap Platform

An AI-powered platform that helps users connect and **swap skills**. Users can list the skills they offer and the skills they want to learn, and the system intelligently matches them using machine learning.

## 🚀 Features

- 🔐 **Authentication** – Secure login and registration with JWT tokens
- 🧠 **AI-Based Matching** – Recommends users based on skill compatibility using advanced ML algorithms
- 📦 **Skill Embedding Model** – Trained on user-skill data for accurate recommendations
- 🌐 **RESTful API** – Built using FastAPI for performance and scalability
- 🛡️ **JWT Authentication** – For secure and stateless user sessions
- 🔍 **Smart Skill Matching** – Uses Sentence Transformers and Cosine Similarity for precise matches

## 🏗️ Project Structure

```
Skill-Swap/
├── backend/
│   ├── app/                    # Core logic: CRUD, models, schemas
│   ├── auth/                   # JWT and OAuth2 logic
│   ├── ml/                     # Recommender logic and training
│   ├── routers/                # FastAPI route handlers
│   ├── data/                   # User skill dataset
│   ├── requirements.txt        # Python dependencies
│   └── .env.example           # Environment variables template
├── README.md
└── .gitignore
```

## 🧪 Tech Stack

- **Backend**: FastAPI (Python 3.12+)
- **Authentication**: OAuth2, JWT
- **ML Model**: Sentence Transformers + Cosine Similarity
- **Database**: SQLite / PostgreSQL (optional)
- **API Documentation**: Swagger UI (auto-generated)
- **Language**: Python 3.12+

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/HarshParikh0810/Skill-Swap.git
cd Skill-Swap/backend
```

### 2. Create and Activate a Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend/` folder:

```env
SECRET_KEY=your_jwt_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

> ⚠️ **Important**: Never commit your `.env` file! Use `.env.example` to share structure safely.

### 5. Run the Backend Server

```bash
uvicorn app.main:app --reload
```

The server will start at `http://localhost:8000`

### 6. Access API Documentation

Once the server is running, you can access:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🔧 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh JWT token

### Skills
- `GET /skills` - List all available skills
- `POST /skills` - Add a new skill
- `PUT /skills/{skill_id}` - Update skill information
- `DELETE /skills/{skill_id}` - Delete a skill

### Users
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update user profile
- `POST /users/skills` - Add skills to user profile
- `GET /users/recommendations` - Get skill swap recommendations

## 🤖 Machine Learning Model

The platform uses a sophisticated ML pipeline:

1. **Skill Embedding**: Converts skill descriptions into high-dimensional vectors using Sentence Transformers
2. **Similarity Matching**: Uses Cosine Similarity to find the best skill matches
3. **Recommendation Engine**: Suggests potential skill swap partners based on compatibility scores

## 🧪 Testing

Run tests using pytest:

```bash
pytest tests/
```

## 🔐 Security

- JWT tokens for stateless authentication
- Password hashing using bcrypt
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration for frontend integration

## 📊 Database Schema

The platform uses the following main entities:

- **Users**: Store user profiles and authentication data
- **Skills**: Master list of available skills
- **UserSkills**: Junction table linking users to their offered/wanted skills
- **Matches**: Store AI-generated skill swap recommendations

## 🚀 Deployment

### Local Development
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 💡 Future Enhancements

- 🗂 **Frontend Dashboard** (React or Flutter)
- 📈 **Skill Progress Tracking** with learning milestones
- 🔔 **Notifications and Messaging** system
- 🌍 **Location-based Matchmaking** for in-person meetings
- 📊 **Analytics Dashboard** for skill trends
- 🎯 **Skill Verification** system
- 💬 **Chat Integration** for seamless communication
- 📱 **Mobile App** for iOS and Android

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

**Development Team:**
- **Harshvardhan Parikh** - GitHub: [@HarshParikh0810](https://github.com/HarshParikh0810)
- **Ayush Thakkar**
- **Heer Trivedi**
- **Hiya Gandhi**

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/HarshParikh0810/Skill-Swap/issues) page
2. Create a new issue with detailed description
3. Join our community discussions

## 🙏 Acknowledgments

- FastAPI for the excellent web framework
- Sentence Transformers for powerful text embeddings
- The open-source community for inspiration and tools

---

⭐ **Star this repository if you find it helpful!**
