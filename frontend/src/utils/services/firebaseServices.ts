
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { app } from '../../config/firebase';
import { IFile } from "../../shared/types";
import BugServices from "./bugServices";
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

const deleteFileFromStorage = async (fileRef: any): Promise<void | null> => {
    try {
        const objectRef = ref(storage, fileRef);
        await deleteObject(objectRef);
    } catch (error) {
        console.log("🚀 ~ file: firebaseServices.ts ~ line 34 ~ deleteFileFromStorage ~ error", error);
        return null;
    }
};

const deleteFilesFromDirStorage = async (refs: any): Promise<void | null> => {
    try {
        const actions = refs.map(async (fileRef: any) => {
            const objectRef = ref(storage, fileRef);
            return (await deleteObject(objectRef));
        })

        await Promise.all(actions);
    } catch (error) {
        console.log("🚀 ~ file: firebaseServices.ts ~ line 34 ~ deleteFileFromStorage ~ error", error);
        return null;
    }
};

const updateUserAvatar = async (file: File, userId: string): Promise<IFile> => {
    const basePath = `avatars/${userId}`;    
    const avatar = await imageUploader(file, basePath);

    await userServices.updateData({ avatar }, userId);
    return avatar;
};

const uploadBugFile = async (currentFiles: IFile[], newfile: File, bugId: string): Promise<IFile | null> => {
    try {
        // Upload file to firebase
        const basePath = `bugs/${bugId}`;
        const fileData: IFile = await imageUploader(newfile, basePath);

        // Save file info on MongoDB
        const filesUpdated = [...currentFiles, fileData];
        await BugServices.updateBug({
            bugId,
            fields: { 
                files: filesUpdated 
            } 
        });

        return fileData;
    } catch (error) {
        console.log("🚀 ~ file: firebaseServices.ts ~ line 51 ~ uploadFileToStorage ~ error", error);
        return null;
    }
}

const removeBugFile = async (currentFiles: IFile[], fileRef: string, bugId: string): Promise<void> => {
    try {
        await deleteFileFromStorage(fileRef);

        const filesUpdated = currentFiles.filter(file => file.ref !== fileRef);
         await BugServices.updateBug({
            bugId,
            fields: { 
                files: filesUpdated 
            } 
        });

    } catch (error) {
        console.log("🚀 ~ file: firebaseServices.ts ~ line 51 ~ uploadFileToStorage ~ error", error);
    }
}

const firebaseServices = {
    uploadBugFile,
    updateUserAvatar,
    deleteFileFromStorage,
    deleteFilesFromDirStorage,
    removeBugFile
}

export default firebaseServices;