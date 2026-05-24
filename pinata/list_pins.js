const pinataJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3N2Q5NDMxYS1hMjdiLTQ2ZGMtYTdlYS0zZjE0ZjZhYjIyYTAiLCJlbWFpbCI6InBhdWxvLm1hdGVuY2lvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3ZjNmZWU4OWQ0YWU4ZjdlZTk3MCIsInNjb3BlZEtleVNlY3JldCI6ImQzNGE4OWRhYWQ5ZDA3MmI0MjY2NWE1NWZmNmRmMjcwNDQ2NTBmOGI0OTViZjQ2ZDg4NTc3NGY3NTMyNGYwYmUiLCJleHAiOjE4MDk1MDg4Nzl9.ek0SAkPtNQcuyXzI_PvJuRQ59oN066b1va97TsXAqeo";

async function run() {
  try {
    const response = await fetch('https://api.pinata.cloud/data/pinList?status=pinned', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${pinataJwt}`,
      },
    });

    if (!response.ok) {
      const err = await response.text();
      console.log('Pinata error:', err);
      return;
    }

    const data = await response.json();
    console.log('--- YOUR PINNED FILES ---');
    if (!data.rows || data.rows.length === 0) {
      console.log('No pinned files found on this Pinata account.');
    } else {
      data.rows.forEach(row => {
        console.log(`CID: ${row.ipfs_pin_hash} | Name: ${row.metadata?.name || 'unnamed'} | Date: ${row.date_pinned}`);
      });
    }
  } catch (err) {
    console.log('Fetch failed:', err);
  }
}

run();
