import {createThumbnail} from 'react-native-create-thumbnail';
import {uploadAFile} from './uploadAfile';

export const multiPost = async (data = []) => {
  try {
    const oldFiles = [];
    const newMedia = [];
    const mediaFiles = [];
    //check if the files has a path
    data.filter(media =>
      media.path ? newMedia.push(media) : oldFiles.push(media),
    );

    for (const media of newMedia) {
      const uri = await uploadAFile(media.path);
      let thumbnail = null;
      if (uri !== false && media.mime == 'video') {
        let response = createThumbnail({
          url: uri,
          timeStamp: 10000,
        });

        const thumbnailUri = await uploadAFile(response.path);

        if (thumbnailUri !== false) {
          thumbnail = thumbnailUri;
        }
        if (thumbnailUri == false) {
          throw new Error('sorry create a thumbnail from our end');
        }
      } else {
      }

      if (uri == false) {
        throw new Error("sorry can't upload your post from our end");
      }
      const newMedia = {
        url: uri,
        thumbnail: thumbnail,
        type: media.mime,
        id: media.id,
        height: media.height,
        width: media.width,
        size: media.size,
      };
      mediaFiles.push(newMedia);
    }

    return [...oldFiles, ...mediaFiles];
  } catch (error) {
    console.log('FAILED TO LOAD MULITIPLE FILES ', error.message);
  }
};
