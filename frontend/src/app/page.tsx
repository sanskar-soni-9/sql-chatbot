import PrimaryButton from "@/components/PrimaryButton";

export default function Home() {
  return (
    <div className="w-full h-full">
      <main className="container mx-auto h-full flex flex-col items-center justify-center pb-20 gap-5">
        <div className="flex flex-col text-4xl font-extrabold tracking-wide md:text-[56px]">
          SQL ChatBot
        </div>
        <div className="flex flex-col items-center space-y-2 md:mt-6 md:flex-row md:space-x-4 md:space-y-0">
          <PrimaryButton isLink href="/chat">
            Generate SQL
          </PrimaryButton>
        </div>
      </main>
    </div>
  );
}
