
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { app } from '../../config/firebase';
import { IFile } from "../../shared/types";
import userServices from "./userServices";

const storage = getStorage(app);

const imageUploader = (file: File, basePath: string): Promise<{url: string, ref: string}> => {
    return new Promise((resolve) => {
        const metadata = {
            contentType: file.type
        };

        const storageRef = ref(storage, `${basePath}/${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on('state_changed', null, null, async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
            resolve({
                url: downloadUrl, 
                ref: uploadTask.snapshot.ref.fullPath
            });
        });
    })
}

const deleteAvatarFromStorage = async (fileRef: any): Promise<void | null> => {
    try {
        const objectRef = ref(storage, fileRef);
        await deleteObject(objectRef);
    } catch (error) {
        return null;
    }
};

const updateUserAvatar = async (file: File, userId: string, token: string): Promise<IFile> => {
    const basePath = `avatars/${userId}`;    
    const avatar = await imageUploader(file, basePath);

    await userServices.updateData({ avatar }, userId, token);
    return avatar;
};

const uploadImageArray = async (files: File[], bugId: string): Promise<IFile[] | null> => {
    try {
        const basePath = `bugs/${bugId}`;

        const updates = files.map(async (file) => {
            return (await imageUploader(file, basePath));
        })

        const paths = await Promise.all(updates);

        return paths;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const firebaseServices = {
    uploadImageArray,
    updateUserAvatar,
    deleteAvatarFromStorage
}

export default firebaseServices;