// api.js
export const fetchTitlesByHostid = async (hostid) => {
    const response = await fetch(`/api/space/spacename?hostid=${hostid}`);
    if (!response.ok) {
        throw new Error('네트워크 응답이 좋지 않습니다.');
    }
    const data = await response.json();
    return data;
};

// api.js
export const fetchSseqByTitle = async (title) => {
    const response = await fetch(`/api/reservation/findSseqByTitle?title=${encodeURIComponent(title)}`);
    if (!response.ok) {
        throw new Error('네트워크 응답이 좋지 않습니다.');
    }
    const data = await response.json();
    return data;
};
