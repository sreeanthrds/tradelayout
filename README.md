# Trade Layout - Trading Strategy Builder

A visual node-based editor for creating, testing, and executing trading strategies without writing code.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v8 or higher)
- Python 3.8 or higher
- Git

## Project Structure

```
tradelayout/
├── src/                    # Frontend source code
├── backend/               # Backend source code (planned)
├── public/               # Static assets
└── package.json         # Frontend dependencies
```

## Branching Strategy

The project follows a three-branch workflow:

1. **develop** branch
   - Main development branch
   - All new features and bug fixes should be developed here
   - Use this branch for daily development work
   - Create feature branches from this branch

2. **master** branch
   - Stable development branch
   - Push completed features from develop to master
   - Used for integration testing
   - Should always be in a working state

3. **main** branch
   - Production-ready branch
   - Only push to main when a complete version is tested and ready for release
   - Should always be stable and production-ready

### Workflow

1. Create feature branches from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. After completing a feature:
   ```bash
   git checkout develop
   git merge feature/your-feature-name
   git push origin develop
   ```

3. When features are stable in develop:
   ```bash
   git checkout master
   git merge develop
   git push origin master
   ```

4. When a complete version is ready for release:
   ```bash
   git checkout main
   git merge master
   git push origin main
   ```

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/sreeanthrds/tradelayout.git
cd tradelayout
```

### 2. Frontend Setup

1. Install frontend dependencies:
```bash
npm install --legacy-peer-deps
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:5173

### 3. Backend Setup (Coming Soon)

The backend is currently in development. Once implemented, it will include:
- Strategy execution engine
- Technical analysis calculations
- Position management
- Performance analytics

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run build:dev` - Builds the app for development
- `npm run lint` - Runs ESLint to check code quality
- `npm run preview` - Previews the production build locally

## Features

- Visual node-based strategy editor
- Real-time strategy validation
- Technical indicator configuration
- Strategy execution simulation
- Performance analytics
- Customizable trading parameters

## Development

### Frontend Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI Components
- React Flow for node-based editing

### Key Components

- `StartNodeEditor`: Entry point for strategy configuration
- Strategy nodes for different trading operations
- Technical indicator calculations
- Position management
- Performance tracking

## Troubleshooting

### Common Issues

1. **Dependency Installation Issues**
   - If you encounter peer dependency conflicts, use:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Port Already in Use**
   - If port 5173 is already in use, Vite will automatically try the next available port
   - Check the terminal output for the correct URL

3. **Node Version Issues**
   - Ensure you're using Node.js v18 or higher
   - Use `node -v` to check your version
   - Use nvm to switch Node versions if needed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[Add your license information here]

## Support

For support, please [add your support contact information or process here]

## Acknowledgments

- [List any acknowledgments or credits here]
