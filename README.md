# StudyNotion - EdTech Platform

StudyNotion is a fully functional, MERN-stack web application designed for online education. It is an end-to-end platform allowing users to create, consume, and rate educational content. The platform is designed with role-based access, offering different features for Students and Instructors.

## Features

- **Authentication**: Secure JWT-based authentication and authorization with OTP email verification.
- **Student Dashboard**: Browse courses, add to cart, purhcase using integrated payment gateways (Razorpay), and watch course videos.
- **Instructor Dashboard**: Create courses, manage course content (sections, subsections, and video lectures), and view statistics on course sales and enrollments.
- **Responsive Navigation**: Full responsiveness across all devices, including a dynamic sidebar and mobile-friendly navigation.
- **Ratings & Reviews**: Students can review courses they've purchased.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Cloud Storage**: Cloudinary (for videos and images)
- **Payments**: Razorpay

## Running the Application Locally

1. **Clone the repository**
2. **Install dependencies**
   - For backend: `cd Server && npm install`
   - For frontend: `npm install`
3. **Configure Environment Variables**
   - Create `.env` files in both the root and `Server` directories based on your `.env.example` configurations.
   - You will need MongoDB URI, Cloudinary credentials, and Razorpay keys.
4. **Start the servers**
   - In the Server directory, run: `npm run dev`
   - In the frontend root directory, run: `npm start` (or `npm run dev` if configured)

## Contributing

Contributions are welcome! If you have any suggestions or find any issues, please feel free to open an issue or pull request.
