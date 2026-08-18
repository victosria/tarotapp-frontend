# Arcana Journey — Tarot Journal

Arcana Journey is a full-stack personal tarot study and journaling application. It brings the tarot card library, spreads, readings, favorites, and personal interpretations together in one calm and intuitive space.

## Live Application

Frontend:
https://tarotapp-frontend.onrender.com

Backend API:
https://tarotapp-backend.onrender.com

## Features

- Create an account and sign in
- Browse and search the Major and Minor Arcana
- Study upright and reversed meanings, symbolism, elements, and keywords
- Explore tarot spreads
- Create and save personal readings
- Keep a journal of questions and interpretations
- Save and remove favorite cards
- Light and dark mode
- Responsive user interface
- Integration with the Arcana Journey REST API

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod
- Radix UI

## Backend Integration

The frontend communicates with the Arcana Journey backend through a REST API.

The API URL is configured using the following environment variable:

`NEXT_PUBLIC_API_URL`

For local development:

`NEXT_PUBLIC_API_URL=http://localhost:4000/api`

For production:

`NEXT_PUBLIC_API_URL=https://tarotapp-backend.onrender.com/api`

## Getting Started

### Requirements

- Node.js
- npm
- Arcana Journey backend running locally or remotely

### Installation

```bash
git clone https://github.com/victosria/tarotapp-frontend.git
cd tarotapp-frontend
npm install