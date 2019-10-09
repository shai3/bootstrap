import joi from '@hapi/joi';

// prettier-ignore
export default {
  url: joi.string().email().required(),

};
// rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov

// rtsp://184.72.239.149/vod/mp4:BigBuckBunny_175k.mov
