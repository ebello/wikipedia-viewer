const baseUrl = 'https://en.wikipedia.org/w/api.php';

const joinParams = (params) => Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');

const searchCache = {};
export const searchPages = async (query) => {
  if (searchCache[query]) {
    return Promise.resolve(searchCache[query]);
  }
  const params = {
    action: 'query',
    list: 'search',
    srsearch: query,
    format: 'json',
  };

  const url = `${baseUrl}?origin=*&${joinParams(params)}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    searchCache[query] = result;
    return result;
  } catch (e) {
    throw new Error(e);
  }
};

export const parsePage = async (pageid) => {
  const params = {
    action: 'parse',
    pageid,
    format: 'json',
  };

  const url = `${baseUrl}?origin=*&${joinParams(params)}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
