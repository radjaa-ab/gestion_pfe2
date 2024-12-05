import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
//import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface FigmaDesignProps {
  apiKey: string;
  fileId: string;
}

export function FigmaDesign({ apiKey, fileId }: FigmaDesignProps) {
  const [design, setDesign] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchDesign = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.to.design/v1/figma/file/${fileId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch design');
      }

      const data = await response.json();
      setDesign(data.url); // Assuming the API returns a URL to the design
      toast({
        title: "Design fetched successfully",
        description: "The Figma design has been loaded.",
      });
    } catch (err) {
      setError('Error fetching design. Please check your API key and file ID.');
      toast({
        title: "Error",
        description: "Failed to fetch the Figma design.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiKey && fileId) {
      fetchDesign();
    }
  }, [apiKey, fileId]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Figma Design</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Loading design...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {design && (
          <div className="aspect-video w-full">
            <iframe 
              src={design} 
              className="w-full h-full border-0" 
              allowFullScreen
            />
          </div>
        )}
        {!design && !loading && !error && (
          <Button onClick={fetchDesign}>Load Design</Button>
        )}
      </CardContent>
    </Card>
  );
}