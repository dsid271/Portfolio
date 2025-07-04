import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import pxArt1 from '/assets/images/pxArt.png';
import pxArt2 from '/assets/images/pxArt (1).png';
import pxArt3 from '/assets/images/pxArt (2).png';
import pxArt4 from '/assets/images/pxArt (3).png';
import pxArt5 from '/assets/images/pxArt (4).png';
import pxArt6 from '/assets/images/pxArt (6).png';
import pxArt7 from '/assets/images/pxArt (7).png';

const projects = [
	{
		title: 'VAYU:Hyper-local Air Quality Forecasting Sytem',
		description:
			'Built an IoT-based system for real-time, hyper-local air quality monitoring and forecasting using deep learning and cloud APIs.',
		tech: ['ESP32', 'Tensorflow', 'Next.js', 'FastAPI', 'Firebase'],
		image: pxArt7,
		links: [
			{
				label: 'GitHub',
				url: 'https://github.com/dsid271/VAYU',
			},
			{
				label: 'Preview',
				url: 'https://9000-firebase-studio-1748786267001.cluster-ancjwrkgr5dvux4qug5rbzyc2y.cloudworkstations.dev/?monospaceUid=509388&embedded=0',
			},
		],
	},
	{
		title: 'Lupus Nephritis Classifier',
		description:
			'Used transfer learning with EfficientNetV2S to classify Lupus Nephritis from kidney images, improving accuracy by 14% to 0.95 with a compact model.',
		tech: ['Keras', 'EfficientNetV2S', 'Transfer Learning', 'Python'],
		image: pxArt2,
		links: [
			{
				label: 'Kaggle',
				url: 'https://www.kaggle.com/code/sidharthad/fork-of-lupusproject',
			},
		],
	},
	{
		title: 'Natural Language Processing Pipeline',
		description:
			'Built an end-to-end NLP pipeline for sentiment analysis on social media data using BERT.',
		tech: ['TensorFlow', 'BERT', 'NLTK'],
		image: pxArt3,
	},
	{
		title: 'Time Series Forecasting',
		description:
			'Implemented LSTM networks for predicting stock market trends with feature engineering.',
		tech: ['Keras', 'Pandas', 'Scikit-learn'],
		image: pxArt4,
	},
	{
		title: 'Finding Similar Questions on Quora',
		description:
			'Developed a system to detect duplicate questions using techniques like Bag of Words (BOW), TF-IDF, and XGBoost.',
		tech: ['XGBoost', 'TF-IDF', 'NLP'],
		image:'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=400',
		links: [
			{
				label: 'Colab Notebook',
				url: 'https://colab.research.google.com/drive/1Dn5iiGH5NlsJhoVuetDjlIJHO-07ibVp?usp=sharing',
			},
    ],
	},
	{
		title: 'Payment Fraud Detection',
		description:
			'Trained ML models on the PaySim1 dataset to identify fraud in online payments, achieving high precision, recall, and AUC.',
		tech: ['Logistic Regression', 'Random Forest', 'EDA'],
		image: pxArt1,
	},
	{
		title: 'Car Price Prediction',
		description:
			'Built a regression model using scikit-learn to predict car prices, handling preprocessing, feature engineering, and evaluation.',
		tech: ['Scikit-learn', 'RandomForestRegressor', 'Python'],
		image: pxArt5,
    links: [
			{
				label: 'Kaggle',
				url: 'https://www.kaggle.com/code/sidharthad/car-price-prediction-with-machine-learning',
			},
		],
	},
	{
		title: 'Language Translation Model',
		description:
			'Developed a transformer-based model for translating English to Hindi and Telugu, using a custom WordPiece tokenizer and Opus100 dataset.',
		tech: ['PyTorch', 'Transformers', 'WordPiece'],
		image: pxArt6,
    links: [
			{
				label: 'Colab Notebook',
				url: 'https://colab.research.google.com/drive/1LreIUTgAIi5TIFoeBC59FfYB-xhMJc3V?usp=sharing',
			},
    ],
	},
];

// Add a mapping from tech name to official documentation URL
const techLinks: Record<string, string> = {
	ESP32: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/',
	Tensorflow: 'https://www.tensorflow.org/',
	'Next.js': 'https://nextjs.org/docs',
	FastAPI: 'https://fastapi.tiangolo.com/',
	Firebase: 'https://firebase.google.com/docs',
	Keras: 'https://keras.io/',
	EfficientNetV2S:
		'https://keras.io/api/applications/efficientnet/#efficientnetv2s-function',
	'Transfer Learning': 'https://www.tensorflow.org/tutorials/images/transfer_learning',
	Python: 'https://docs.python.org/3/',
	TensorFlow: 'https://www.tensorflow.org/',
	BERT: 'https://huggingface.co/docs/transformers/model_doc/bert',
	NLTK: 'https://www.nltk.org/',
	Pandas: 'https://pandas.pydata.org/docs/',
	'Scikit-learn': 'https://scikit-learn.org/stable/',
	XGBoost: 'https://xgboost.readthedocs.io/en/stable/',
	'TF-IDF':
		'https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html',
	NLP: 'https://en.wikipedia.org/wiki/Natural_language_processing',
	'Logistic Regression':
		'https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression',
	'Random Forest': 'https://scikit-learn.org/stable/modules/ensemble.html#random-forests',
	EDA: 'https://en.wikipedia.org/wiki/Exploratory_data_analysis',
	'RandomForestRegressor':
		'https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html',
	PyTorch: 'https://pytorch.org/docs/stable/index.html',
	Transformers: 'https://huggingface.co/docs/transformers/index',
	WordPiece: 'https://huggingface.co/docs/transformers/main/en/model_doc/bert#overview',
};

const container = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const item = {
	hidden: { y: 30, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
		},
	},
};

export function Projects() {
	const [ref, controls] = useScrollAnimation();

	return (
		<section id="projects" className="py-20 bg-[var(--pixel-bg)]">
			<div className="container mx-auto px-4">
				<motion.h2
					className="text-3xl font-['Press'] text-[var(--pixel-primary)] text-center mb-12 pixel-text"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					PROJECTS
				</motion.h2>
				<motion.div
					ref={ref}
					variants={container}
					initial="hidden"
					animate={controls}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{projects.map((project, index) => (
						<motion.div
							key={index}
							variants={item}
							className="pixel-border bg-[var(--pixel-bg)] overflow-hidden hover:scale-105 transition-transform"
						>
							<div className="relative">
								<motion.img
									src={project.image}
									alt={project.title}
									className="w-full h-48 object-cover scanline"
									whileHover={{ scale: 1.1 }}
									transition={{ duration: 0.3 }}
								/>
								<div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--pixel-bg)]"></div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-['Press'] text-[var(--pixel-primary)] mb-3">
									{project.title}
								</h3>
								<p className="text-[var(--pixel-accent)] mb-4 min-h-[120px]">
									{project.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{project.tech.map((tech, techIndex) => {
										const url = techLinks[tech];
										return url ? (
											<motion.a
												key={techIndex}
                        href={url}
												target="_blank"
												rel="noopener noreferrer"
												className="bg-[var(--pixel-primary)] text-[var(--pixel-bg)] px-3 py-1 text-sm font-['commodore'] hover:bg-[var(--pixel-accent)] transition-colors"
												whileHover={{ scale: 1.1 }}
												transition={{ duration: 0.2 }}
												style={{ textDecoration: 'none' }}
											>
												{tech}
											</motion.a>
										) : (
											<motion.span
												key={techIndex}
												className="bg-[var(--pixel-primary)] text-[var(--pixel-bg)] px-3 py-1 text-sm font-['commodore'] hover:bg-[var(--pixel-accent)] transition-colors"
												whileHover={{ scale: 1.1 }}
												transition={{ duration: 0.2 }}
											>
												{tech}
											</motion.span>
										);
									})}
								</div>
								{project.links && (
									<div className="flex flex-wrap gap-5 mt-4 justify-center">
										{project.links.map((link, linkIdx) => (
											<a
												key={linkIdx}
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
												className="pixel-border bg-[var(--pixel-primary)] text-[var(--pixel-bg)] px-4 py-1 text-sm font-['Press'] hover:bg-[var(--pixel-accent)] transition-colors inline-flex items-center gap-1"
												style={{ textShadow: '1px 1px 0 #000' }}
											>
												<span>▶</span> {link.label}
											</a>
										))}
									</div>
								)}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
