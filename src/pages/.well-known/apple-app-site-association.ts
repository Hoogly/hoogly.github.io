export async function GET() {
  const appleAppSiteAssociation = {
    "applinks": {
      "apps": [],
      "details": [
        {
          "appID": "C742WYA3LH.com.hoogly.dev",
          "paths": [
            "NOT /_/*",
            "/linktest/*",
            "/settings",
            "/*"
          ]
        }
      ]
    }
  };

  return new Response(JSON.stringify(appleAppSiteAssociation, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
      "Content-Disposition": "inline"
    }
  });
} 