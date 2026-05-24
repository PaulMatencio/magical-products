const pinataJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3N2Q5NDMxYS1hMjdiLTQ2ZGMtYTdlYS0zZjE0ZjZhYjIyYTAiLCJlbWFpbCI6InBhdWxvLm1hdGVuY2lvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3ZjNmZWU4OWQ0YWU4ZjdlZTk3MCIsInNjb3BlZEtleVNlY3JldCI6ImQzNGE4OWRhYWQ5ZDA3MmI0MjY2NWE1NWZmNmRmMjcwNDQ2NTBmOGI0OTViZjQ2ZDg4NTc3NGY3NTMyNGYwYmUiLCJleHAiOjE4MDk1MDg4Nzl9.ek0SAkPtNQcuyXzI_PvJuRQ59oN066b1va97TsXAqeo";
const cid = "QmSULKYHYsDh3THkqD8qBbDYexwmETibBQ6gfp5fVCjjUz";

async function run() {
  try {
    const url = `https://api.pinata.cloud/pinning/unpin/${cid}`;
    console.log('Sending DELETE request to:', url);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${pinataJwt}`,
      },
    });

    console.log('Response Status:', response.status);
    console.log('Response StatusText:', response.statusText);
    const body = await response.text();
    console.log('Response Body:', body);
  } catch (err) {
    console.error('Request failed:', err);
  }
}

run();
