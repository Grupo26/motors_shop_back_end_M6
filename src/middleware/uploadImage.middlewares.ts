import multer from "multer";

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (request, file, callback) => {
        const filename = `${file.originalname}`;
        const files = request.files;
        request.files;
        return callback(null, filename);
    },
});

const uploadImageMiddleware = multer({ storage: storage });

export default uploadImageMiddleware;

