import LRU from 'lru-cache';

const options = {
  max: 5000,
  length: function (n, key) {
    return n * 2 + key.length;
  },
  //dispose: function (key, n) { n.close() },
  maxAge: 1000 * 60 * 60
};
export const cacheKeys = {
  maxAge: {
    onehour: 3600000,
    oneday: 86400000
  },
  topic_majors: 'topic_majors',
  syscode_reports: 'syscode_reports'
};

export const cache = new LRU(options);
