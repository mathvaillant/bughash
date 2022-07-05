
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

const uploadImageArray = async (
    files: File[], 
    type: 'bug' | 'avatar', 
    bugId: string | null, 
    userId: string | null,
    token: string | null
): Promise<string[]> => {
    try {

        // Upload images to firebase storage
        const basePathByType = {
            bug: `bugs/${bugId}`,
            avatar: `avatars/${userId}`
        };

        const updates = files.map(async (file) => {
            return (await imageUploader(file, basePathByType[type]))
        })

        const paths = await Promise.all(updates);


        // Update images for Bug/User avatar
        if(type === 'avatar' && userId) {
           await userServices.updateData({avatar: paths[0]}, userId, token);
        } // else {
            // handle images of bugs
        //}

        return paths;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const firebaseServices = {
    uploadImageArray
}

export default firebaseServices;