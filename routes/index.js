const router = require('express').Router();
const userRoutes = require('./api/userRoute'); // Adjust the path based on your project structure
// Import other route files as needed

router.use('/api/users', userRoutes);
// Add other routes using router.use as needed
router.use('/thoughts', require('./api/thoughtRoute'));
module.exports = router;
