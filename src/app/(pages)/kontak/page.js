import { AddressCard, AlamatCard, KontakCard } from "@/app/components/Kontak/page";

const KontakPage = () => {
    return (
        <main className="w-10/12 mx-auto flex min-h-screen flex-col items-center justify-between">
            <div className="flex flex-col lg:flex-row w-full">
                <div className="flex flex-col w-full lg:w-2/3">
                    <AddressCard />
                </div>
                <div className="w-full lg:w-1/3">
                    <AlamatCard />
                    <KontakCard />
                </div>
            </div>
        </main>
    )
}

export default KontakPage;