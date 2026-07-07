import { Header } from '../../components/header/header'
import { TravellerInfo } from '../../components/TravellerInfo/TravellerInfo'
import { PageTitle } from '@/app/components/PageTitle/PageTitle';
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
            <PageTitle titleText="Статті Мандрівника" />
        </main>
        <Footer />
    </>
);
}