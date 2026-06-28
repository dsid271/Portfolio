export const resumeData = {
    hero: {
        name: "SIDHARTHA DONDAPATI",
        title: "Machine Learning Engineer",
        tagline: "Building Intelligence. Engineering Experience.",
        location: "Hyderabad, Telangana"
    },
    about: {
        bio: "AI/ML engineer skilled in Python and SQL, experienced with TensorFlow, FastAPI, and production ML deployment. I work on data pipelines, model deployment, and automation across cloud platforms (GCP) to turn research into reliable, maintainable systems.",
        contact: {
            phone: "(+91) 6309-787-190",
            email: "dsid271@gmail.com",
            linkedin: "linkedin.com/in/dsidhartha",
            github: "github.com/dsid271",
            portfolio: "dsid271.github.io/Portfolio"
        }
    },
    experience: [
        {
            company: "Cisco Systems",
            role: "Consulting Engineer Trainee - India Technical Apprentice",
            period: "Jan 2026 - Present",
            description: "Joined Cisco focusing on network automation, infrastructure reliability, and integration between cloud services and on-prem networking.",
            achievements: [
                "Contributed to automation scripts for network provisioning and monitoring.",
                "Collaborated with cross-functional teams to improve network observability and incident response workflows."
            ]
        },
        {
            company: "Kodryx AI",
            role: "AI Engineer Intern",
            period: "Oct 2025 - Jan 2026",
            description: "Developed an intelligent document analysis system combining AI reasoning with forensic algorithms.",
            achievements: [
                "Built ML-powered forensic modules including signature verification, steganography detection, and content analysis.",
                "Implemented end-to-end AI pipeline with streaming analytics, vector search, and automated fraud detection workflows."
            ]
        }
    ],
    projects: [
        {
            title: "Vayu",
            subtitle: "Hyper-local Air Quality Forecasting System",
            description: "Built an IoT-based system for real-time, hyper-local air quality monitoring and forecasting using deep learning and cloud APIs.",
            stack: ["ESP32", "Tensorflow", "Next.js", "FastAPI", "Firebase"],
            links: [
                { label: "GitHub", url: "https://github.com/dsid271/VAYU" },
                { label: "Preview", url: "https://vayudashboard.vercel.app/" }
            ]
        },
        {
            title: "Serverless GenAI Log Analyzer",
            subtitle: "PoC Generative AI Tool",
            description: "Built a GenAI log analyzer using FastAPI, LangChain, and Google Gemini. Packaged in Docker for Cloud Run.",
            stack: ["Python", "Google Gemini API", "LangChain", "Docker", "Google Cloud Run"],
            links: []
        },
        {
            title: "Lupus Nephritis Classifier",
            subtitle: "Medical Image Classification",
            description: "Used transfer learning with EfficientNetV2S to classify Lupus Nephritis from kidney images, improving accuracy by 14% to 0.95 with a compact model.",
            stack: ["Keras", "EfficientNetV2S", "Transfer Learning", "Python"],
            links: [{ label: "Kaggle", url: "https://www.kaggle.com/code/sidharthad/fork-of-lupusproject" }]
        },
        {
            title: "Language Translation Model",
            subtitle: "Custom Transformer Model",
            description: "Developed a transformer-based model for translating English to Hindi and Telugu, using a custom WordPiece tokenizer and Opus100 dataset.",
            stack: ["PyTorch", "Transformers", "WordPiece"],
            links: [{ label: "Colab Notebook", url: "https://colab.research.google.com/drive/1LreIUTgAIi5TIFoeBC59FfYB-xhMJc3V?usp=sharing" }]
        },
        {
            title: "Finding Similar Questions on Quora",
            subtitle: "Duplicate Detection NLP",
            description: "Developed a system to detect duplicate questions using techniques like Bag of Words (BOW), TF-IDF, and XGBoost.",
            stack: ["XGBoost", "TF-IDF", "NLP"],
            links: [{ label: "Colab Notebook", url: "https://colab.research.google.com/drive/1Dn5iiGH5NlsJhoVuetDjlIJHO-07ibVp?usp=sharing" }]
        },
        {
            title: "Car Price Prediction",
            subtitle: "Machine Learning Regression",
            description: "Built a regression model using scikit-learn to predict car prices, handling preprocessing, feature engineering, and evaluation.",
            stack: ["Scikit-learn", "Python", "RandomForestRegressor"],
            links: [{ label: "Kaggle", url: "https://www.kaggle.com/code/sidharthad/car-price-prediction-with-machine-learning" }]
        },
        {
            title: "Natural Language Processing Pipeline",
            subtitle: "Sentiment Analysis",
            description: "Built an end-to-end NLP pipeline for sentiment analysis on social media data using BERT.",
            stack: ["TensorFlow", "BERT", "NLTK"],
            links: []
        },
        {
            title: "Time Series Forecasting",
            subtitle: "Stock Market Predictions",
            description: "Implemented LSTM networks for predicting stock market trends with feature engineering.",
            stack: ["Keras", "Pandas", "Scikit-learn"],
            links: []
        },
        {
            title: "Payment Fraud Detection",
            subtitle: "Anomaly Detection",
            description: "Trained ML models on the PaySim1 dataset to identify fraud in online payments, achieving high precision, recall, and AUC.",
            stack: ["Logistic Regression", "Random Forest", "EDA"],
            links: []
        }
    ],
    education: [
        {
            institution: "Jawaharlal Nehru Technological University, Hyderabad",
            degree: "B.Tech : CSE (AI&ML)",
            period: "Oct 2021 - July 2025"
        },
        {
            institution: "Army Public School Golconda",
            degree: "High School (PCM)",
            period: "Feb 2020 - July 2021"
        }
    ],
    skills: {
        languages: ["Python", "SQL (MySQL, Postgres)", "TypeScript"],
        frameworks: ["TensorFlow", "Keras", "FastAPI", "Crew.ai", "React"],
        tools: ["Git/Github", "Docker", "Hugging Face", "GCP", "AWS", "UiPath"],
        libraries: ["pandas", "NumPy", "Matplotlib", "LangChain", "scikit-learn", "PySpark"]
    },
    awards: [
        "TCS Codevita Global Ranking 378",
        "Ranked 947/2706 in Automated Essay Scoring (Kaggle)",
        "NCC 'B' Certificate (Grade 'A')",
        "Oracle Cloud Infrastructure 2025 Generative AI Professional",
        "Cisco Certified Network Associate (CCNA) — 2026"
    ]
};
