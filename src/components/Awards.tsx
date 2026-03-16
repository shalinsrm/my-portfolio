import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import awardsData from "@/data/awards.json";
import { awardSchema } from "@/lib/schemas";

export default function Awards() {
  const awards = awardSchema.parse(awardsData).awards;

  const categories = ["All", "Cybersecurity", "DECA", "Other"];

  return (
    <section className="flex flex-col gap-8">
      <h2 className="title text-2xl sm:text-3xl">awards & accomplishments</h2>
      <Tabs defaultValue="All">
        <TabsList className="mb-2 flex flex-wrap gap-2">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="mt-6 flex flex-col gap-4">
              {awards
                .filter(
                  (award) =>
                    category === "All" || award.category === category
                )
                .map((award, i) => (
                  <div key={i} className="border-b pb-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="font-bold">{award.title}</h3>
                        <p className="text-sm text-foreground">
                          {award.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-center gap-1 mt-2 sm:mt-0 text-right ml-auto">
                        <span className="text-xs px-2 py-1 bg-muted rounded">
                          {award.tag}
                        </span>
                        <span className="text-xs text-muted-foreground mr-[3px]">
                          {award.year}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
