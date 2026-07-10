import Image from 'next/image';
import css from './about.module.css';

export default function About() {
  return (
    <section className={css.aboutSection}>
      <div className="container">
        <div className={css.flexContainerAbout}>
          <div className={css.aboutTextWrapper}>
            <h2 className={css.heroAbout}>
              Мандруй екологічно та відкривай нові горизонти
            </h2>

            <p className={`${css.aboutText} ${css.aboutTextMargin}`}>
              Наш проект створений для тих, хто хоче досліджувати Україну
              відповідально. Ми допоможемо знайти унікальні маршрути, які
              поєднують красу природи, локальну культуру та принципи сталого
              туризму.
            </p>

            <div className={css.aboutContent}>
              <div className={css.aboutTextContainer}>
                <h3 className={css.heroAboutText}>Еко-маршрути по Україні</h3>

                <p className={`${css.aboutText} ${css.aboutTextDesctop}`}>
                  Від Карпат до Чорного моря — добірка локацій, де можна
                  подорожувати без шкоди для довкілля.
                </p>
              </div>

              <div className={css.aboutTextContainer}>
                <h3 className={css.heroAboutText}>
                  Практичні екологічні поради
                </h3>

                <p className={`${css.aboutText} ${css.aboutTextDesctop}`}>
                  Дізнайся, як зменшити свій екологічний слід під час мандрів,
                  та зробити подорож комфортною й свідомою.
                </p>
              </div>
            </div>
          </div>

          <picture className={css.aboutImageWrapper}>
            <source media="(min-width: 1440px)" srcSet="/eco-desktop.jpg" />
            <source media="(min-width: 768px)" srcSet="/eco-tablet.jpg" />

            <Image
              className={css.aboutImage}
              src="/eco-mobil.jpg"
              alt="Екологічний туризм"
              width={335}
              height={410}
              priority
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
