import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../../config/firebase';

const storage = getStorage(app);

const imageUploader = (file: File, bugId: string): Promise<string> => {
    return new Promise((resolve) => {
        const metadata = {
            contentType: file.type
        };

        const storageRef = ref(storage, `bugs/${bugId}/images/${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Start the upload
        uploadTask.on('state_changed', null, null, async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
            resolve(downloadUrl);
        });
    })
}

const uploadImgArray = async (files: File[], bugId: string): Promise<string[] | undefined> => {
    try {
        const updates = files.map(async (file) => {
            return (await imageUploader(file, bugId))
        })

        const paths = await Promise.all(updates);
        
        return paths;

    } catch (error) {
        console.log(error);
    }
}

const firebaseServices = {
    uploadImgArray
}

export default firebaseServices;

