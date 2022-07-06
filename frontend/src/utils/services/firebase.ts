
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../../config/firebase';
import userServices from "./userServices";

const storage = getStorage(app);

const imageUploader = (file: File, basePath: string): Promise<string> => {
    return new Promise((resolve) => {
        const metadata = {
            contentType: file.type
        };

        const storageRef = ref(storage, `${basePath}/${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Start the upload
        uploadTask.on('state_changed', null, null, async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
            resolve(downloadUrl);
        });
    })
}

const updateUserAvatar = async (file: File, userId: string, token: string): Promise<string> => {
    const basePath = `avatars/${userId}`;
    
    // Upload to Firebase storage
    const avatarUrl = await imageUploader(file, basePath);

    // Update avatar url on MongoDB
    await userServices.updateData({ avatarUrl }, userId, token);
    return avatarUrl;
};

const uploadImageArray = async (files: File[], bugId: string): Promise<string[]> => {
    try {
        const basePath = `bugs/${bugId}`; // each bug file will need its own uniq id;

        const updates = files.map(async (file) => {
            return (await imageUploader(file, basePath));
        })

        const paths = await Promise.all(updates);

        return paths;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const firebaseServices = {
    uploadImageArray,
    updateUserAvatar
}

export default firebaseServices;