# Contributing to The Infinite Intelligence

Thank you for your interest in contributing! This guide will help you get started.

## 📋 Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct. By participating, you agree to uphold this code.

## 🚀 Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/the-infinite-intelligence.git
   cd the-infinite-intelligence
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development Workflow

1. **Start the dev server**:
   ```bash
   npm run dev
   ```
2. **Lint your code** before committing:
   ```bash
   npm run lint
   ```
3. **Run the test suite**:
   ```bash
   npm run test
   ```

## 📝 Commit Guidelines

- Use clear, descriptive commit messages.
- Follow the format: `type: short description`
  - **feat**: A new feature
  - **fix**: A bug fix
  - **docs**: Documentation changes
  - **style**: Formatting, missing semicolons, etc. (no code change)
  - **refactor**: Code change that neither fixes a bug nor adds a feature
  - **test**: Adding or updating tests
  - **chore**: Build process or auxiliary tool changes

**Examples:**
```
feat: add agent preset export functionality
fix: correct token count overflow in synthesis view
docs: update README setup instructions
```

## 🔀 Pull Request Process

1. **Ensure your branch is up-to-date** with `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
2. **Push** your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
3. **Open a Pull Request** against the `main` branch of the upstream repository.
4. **Fill out the PR description** with:
   - What the change does
   - Why it's needed
   - Any relevant issue numbers (e.g., `Closes #42`)
5. **Address review feedback** promptly.

## 🧪 Testing

- All new features should include relevant tests in the `tests/` directory.
- Ensure all existing tests pass before submitting a PR.
- Test files should follow the naming convention: `ComponentName.test.tsx`.

## 🏗️ Project Structure

```
├── components/         # React UI components
│   └── modals/         # Modal and sidebar components
├── conductor/          # Project documentation and guidelines
├── services/           # API service layer (Gemini integration)
├── tests/              # Test files
├── App.tsx             # Main application component
├── constants.ts        # Application constants and agent configurations
├── types.ts            # TypeScript type definitions
├── index.tsx           # Application entry point
└── vite.config.ts      # Vite and Vitest configuration
```

## 💡 Tips

- Keep PRs focused and small — one feature or fix per PR.
- Write descriptive variable and function names.
- Follow existing code style and patterns.
- Update documentation if your change affects usage.

## 📬 Questions?

If you have questions, feel free to [open an issue](https://github.com/dhaatrik/the-infinite-intelligence/issues) or start a discussion.

---

Thank you for helping make The Infinite Intelligence better! 🚀
