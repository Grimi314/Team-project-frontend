import { Header } from '../../components/header/header'
import { TravellerInfo } from '../../components/TravellerInfo/TravellerInfo'
import { Footer } from '../../components/footer/footer'

export default async function TravellerPage({
  params,
}: {
  params: { travellerId: string };
}) {
  const { travellerId } = await params;

  return (
    <>
        <Header />
        <main>
            <TravellerInfo travellerId={travellerId} />
        </main>
        <Footer />
    </>
);
}