const pinataJwt = "YOUR_PINATA_JWT_HERE";

async function run() {
    try {
        // Create a simple text file in memory
        const blob = new Blob(["Hello from test script!"], { type: "text/plain" });
        const formData = new FormData();
        formData.append("file", blob, "test_file.txt");

        // Add optional pinata metadata
        formData.append("pinataMetadata", JSON.stringify({
            name: "Direct Node Upload Test"
        }));

        console.log('Sending POST request to pin file...');
        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${pinataJwt}`,
                // Note: fetch will automatically set the correct multipart/form-data boundary
            },
            body: formData
        });

        console.log('Response Status:', response.status);
        const data = await response.json();
        console.log('Response Data:', data);
    } catch (err) {
        console.error('Request failed:', err);
    }
}

run();
