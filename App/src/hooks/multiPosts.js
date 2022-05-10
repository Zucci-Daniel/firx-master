import {createThumbnail} from 'react-native-create-thumbnail';
import { uploadAFile } from './uploadAfile';

export const multiPost = async (data = []) => {


  console.log(data, ' the data given in the mulitpost fun');
  try {
    const mediaFiles = [];
    for (const media of data) {
      console.log(media.path, media, ' waht the fuck');
      const uri = await uploadAFile(media.path);
      let thumbnail = null;
      if (uri !== false && media.mime == 'video') {
        console.log('theres media');

        let response = createThumbnail({
          url: uri,
          timeStamp: 10000,
        });

        const thumbnailUri = await uploadAFile(response.path);

        if (thumbnailUri !== false) {
          console.log('theres thumbnail');
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
      console.log(newMedia, ' before firestore');
      mediaFiles.push(newMedia);
    }
    return mediaFiles;
  } catch (error) {
    console.log('FAILED TO LOAD MULITIPLE FILES ', error.message);
  }
};
