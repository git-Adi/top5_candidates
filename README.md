# HireFive - Candidate Selection Tool

HireFive is a modern web application designed to help recruiters and hiring managers efficiently review and select the top 5 candidates from a pool of applicants. The application provides a clean, intuitive interface for uploading candidate data, reviewing candidate information, and analyzing diversity metrics.

## Features

- **Candidate Management**: View and manage all candidate applications in a sortable table
- **Top 5 Selection**: Easily identify and track your top 5 candidates
- **Diversity Dashboard**: Monitor diversity metrics of your selected candidates
- **File Upload**: Simple CSV file upload for importing candidate data
- **Responsive Design**: Works on desktop and tablet devices

## Tech Stack

### Frontend

- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- React Beautiful DnD for drag-and-drop functionality

### Backend

- Node.js with Express
- TypeScript
- CORS enabled for cross-origin requests
- File upload handling with express-fileupload

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (v7 or higher)

### Installation

1. **Clone the repository**

   ```bash
   git clone [your-repository-url]
   cd hire-five
   ```

2. **Install dependencies**

   ```bash
   # Install frontend dependencies
   cd frontend
   pnpm install

   # Install backend dependencies
   cd ../backend
   pnpm install
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd backend
   pnpm start
   ```

   The backend will be available at `http://localhost:3000`

2. **Start the frontend development server**

   ```bash
   cd frontend
   pnpm dev
   ```

   The frontend will be available at `http://localhost:5173`

## Project Structure

```
hire-five/
├── backend/               # Backend server code
│   ├── src/
│   │   ├── types.ts      # TypeScript type definitions
│   │   └── index.ts      # Main server file
│   └── package.json      # Backend dependencies
│
└── frontend/             # Frontend React application
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── hooks/        # Custom React hooks
    │   ├── App.tsx       # Main application component
    │   └── main.tsx      # Application entry point
    └── package.json      # Frontend dependencies
```

## Usage

1. **Upload Candidate Data**

   - Click the "Upload CSV" button to upload a CSV file containing candidate information
   - The CSV should include columns for: id, name, location, years of experience, and skills

2. **Review Candidates**

   - View all candidates in the main table
   - Sort candidates by different criteria

3. **Select Top 5**

   - Use drag-and-drop to select your top 5 candidates
   - The diversity dashboard will update in real-time

4. **Analyze Diversity**

   - Monitor diversity metrics in the dashboard
   - Make informed hiring decisions based on the data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - Aditya - aditya.arya3131@gmail.com

Project Link: https://github.com/git-Adi/top5_candidates
