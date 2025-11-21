import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

const Impressum: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleNavigation = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F2F1ED', paddingTop: '6rem' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 xl:py-10 2xl:py-16">

                {/* Back Butto */}
                <button
                    onClick={handleNavigation}
                    className="mb-8 sm:mb-10 xl:mb-6 2xl:mb-10 flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-base sm:text-lg xl:text-base 2xl:text-lg font-light">Zurück</span>
                </button>

                {/* Header */}
                <div className="mb-12 sm:mb-16 xl:mb-10 2xl:mb-16">
                    <h1 className="text-4xl sm:text-5xl xl:text-3xl 2xl:text-5xl font-light text-gray-900 mb-4">
                        Impressum
                        <div className="w-24 sm:w-32 xl:w-24 2xl:w-32 h-1 mt-3 sm:mt-4 xl:mt-3 2xl:mt-4" style={{ backgroundColor: '#D5DD48' }}></div>
                    </h1>
                </div>

                {/* Main Content */}
                <div className="space-y-8 sm:space-y-12 xl:space-y-8 2xl:space-y-12">

                    {/* Contact Information */}
                    <div className="bg-white p-8 sm:p-12 xl:p-8 2xl:p-12 rounded-xl shadow-sm">
                        <h2 className="text-2xl sm:text-3xl xl:text-2xl 2xl:text-3xl font-light text-gray-900 mb-6 sm:mb-8 xl:mb-6 2xl:mb-8">
                            Kontaktinformationen
                        </h2>
                        <div className="space-y-3 sm:space-y-4 xl:space-y-3 2xl:space-y-4 text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light">
                            <p><strong className="font-normal">Name:</strong> Adriana Wolfger</p>
                            <p><strong className="font-normal">Adresse:</strong> Rehweg 1, 8430 Wagna, Austria</p>
                            <p><strong className="font-normal">Unternehmensgegenstand:</strong> Nageldesign und Schulungen</p>
                            <p><strong className="font-normal">Tel:</strong> <a href="tel:+436644523026" className="hover:opacity-70 transition-opacity" style={{ color: '#A8B536' }}>+43 664 4523026</a></p>
                            <p><strong className="font-normal">E-Mail:</strong> <a href="mailto:hi@blickfang-nagelstudio.at" className="hover:opacity-70 transition-opacity" style={{ color: '#A8B536' }}>hi@blickfang-nagelstudio.at</a></p>
                            <p><strong className="font-normal">Berufsbezeichnung:</strong> Nageldesigner</p>
                        </div>
                    </div>

                    {/* Legal Information */}
                    <div className="bg-white p-8 sm:p-12 xl:p-8 2xl:p-12 rounded-xl shadow-sm">
                        <h2 className="text-2xl sm:text-3xl xl:text-2xl 2xl:text-3xl font-light text-gray-900 mb-6 sm:mb-8 xl:mb-6 2xl:mb-8">
                            Rechtliche Informationen
                        </h2>
                        <div className="space-y-3 sm:space-y-4 xl:space-y-3 2xl:space-y-4 text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light">
                            <p><strong className="font-normal">Mitgliedschaft:</strong> WKO (Wirtschaftskammerorganisation)</p>
                            <p><strong className="font-normal">Aufsichtsbehörde:</strong> Bezirkshauptmannschaft Leibnitz</p>
                            <p><strong className="font-normal">Anwendbare Rechtsvorschriften:</strong> Gewerbeordnung – <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#A8B536' }}>www.ris.bka.gv.at</a></p>
                        </div>
                    </div>

                    {/* Website Credit */}
                    <div className="bg-white p-6 sm:p-8 xl:p-6 2xl:p-8 rounded-xl shadow-sm text-center">
                        <p className="text-sm sm:text-base xl:text-sm 2xl:text-base text-gray-600 font-light">
                            Website erstellt von <span className="font-normal" style={{ color: '#A8B536' }}>Levra</span>
                        </p>
                    </div>

                    {/* Liability Disclaimer */}
                    <div className="bg-white p-8 sm:p-12 xl:p-8 2xl:p-12 rounded-xl shadow-sm">
                        <h2 className="text-2xl sm:text-3xl xl:text-2xl 2xl:text-3xl font-light text-gray-900 mb-6 sm:mb-8 xl:mb-6 2xl:mb-8">
                            Haftungsausschluss
                        </h2>
                        <div className="space-y-6 sm:space-y-8 xl:space-y-6 2xl:space-y-8">

                            <div>
                                <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-normal text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                    Allgemein
                                </h3>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                                    Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese Webseite verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-normal text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                    Haftung für Inhalte dieser Webseite
                                </h3>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                                    Die Inhalte dieser Webseite wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr. Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-normal text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                    Haftung für Links auf Webseiten Dritter
                                </h3>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                                    Unser Angebot enthält Links zu externen Websites. Auf den Inhalt dieser externen Webseiten haben wir keinerlei Einfluss. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-normal text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                    Urheberrecht
                                </h3>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                                    Die Betreiber dieser Webseite sind bemüht, stets die Urheberrechte anderer zu beachten bzw. auf selbst erstellte sowie lizenzfreie Werke zurückzugreifen. Die durch die Seitenbetreiber erstellten Inhalte und Werke auf dieser Webseite unterliegen dem Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Policy */}
                    <div className="bg-white p-8 sm:p-12 xl:p-8 2xl:p-12 rounded-xl shadow-sm">
                        <h2 className="text-2xl sm:text-3xl xl:text-2xl 2xl:text-3xl font-light text-gray-900 mb-6 sm:mb-8 xl:mb-6 2xl:mb-8">
                            Datenschutzerklärung
                        </h2>
                        <div className="space-y-6 sm:space-y-8 xl:space-y-6 2xl:space-y-8">

                            <div>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed mb-6">
                                    Wir legen großen Wert auf den Schutz Ihrer Daten. Um Sie in vollem Umfang über die Verwendung personenbezogener Daten zu informieren, bitten wir Sie die folgenden Datenschutzhinweise zur Kenntnis zu nehmen.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-normal text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                    Persönliche Daten
                                </h3>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                                    Persönliche Daten, die Sie auf dieser Website elektronisch übermitteln, wie zum Beispiel Name, E-Mail-Adresse, Adresse oder andere persönlichen Angaben, werden von uns nur zum jeweils angegebenen Zweck verwendet, sicher verwahrt und nicht an Dritte weitergegeben. Der Provider erhebt und speichert automatisch Informationen am Webserver wie verwendeter Browser, Betriebssystem, Verweisseite, IP-Adresse, Uhrzeit des Zugriffs usw. Diese Daten können ohne Prüfung weiterer Datenquellen keinen bestimmten Personen zugeordnet werden und wir werten diese Daten auch nicht weiter aus solange keine rechtswidrige Nutzung unserer Webseite vorliegt.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-normal text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                    Formulardaten und Kommentare
                                </h3>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                                    Wenn Webseitenbesucher Kommentare oder Formulareinträge hinterlassen, werden die eingegebenen Daten und ihre IP-Adressen gespeichert. Das erfolgt zur Sicherheit, falls jemand widerrechtliche Inhalte verfasst (Beleidigungen, links- oder rechtsextreme Propaganda, Hasspostings usw.). In diesem Fall sind wir an der Identität des Verfassers interessiert.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-normal text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                    Cookies
                                </h3>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                                    Cookies sind kleine Dateien, die es dieser Webseite ermöglichen auf dem Computer des Besuchers spezifische, auf den Nutzer bezogene Informationen zu speichern, während unsere Website besucht wird. Cookies helfen uns dabei, die Nutzungshäufigkeit und die Anzahl der Nutzer unserer Internetseiten zu ermitteln, sowie unsere Angebote für Sie komfortabel und effizient zu gestalten. Wir verwenden einerseits Session-Cookies, die ausschließlich für die Dauer Ihrer Nutzung unserer Website zwischengespeichert werden und zum anderen permanente Cookies, um Informationen über Besucher festzuhalten, die wiederholt auf unsere Website zugreifen. Der Zweck des Einsatzes dieser Cookies besteht darin, eine optimale Benutzerführung anbieten zu können sowie Besucher wiederzuerkennen und bei wiederholter Nutzung eine möglichst attraktive Website und interessante Inhalte präsentieren zu können. Der Inhalt eines permanenten Cookies beschränkt sich auf eine Identifikationsnummer. Name, IP-Adresse usw. werden nicht gespeichert. Eine Einzelprofilbildung über Ihr Nutzungsverhalten findet nicht statt. Eine Nutzung unserer Angebote ist auch ohne Cookies möglich. Sie können in Ihrem Browser das Speichern von Cookies deaktivieren, auf bestimmte Webseiten beschränken oder Ihren Webbrowser (Chrome, IE, Firefox,…) so einstellen, dass er sie benachrichtigt, sobald ein Cookie gesendet wird. Sie können Cookies auch jederzeit von der Festplatte ihres PC löschen. Bitte beachten Sie aber, dass Sie in diesem Fall mit einer eingeschränkten Darstellung der Seite und mit einer eingeschränkten Benutzerführung rechnen müssen.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-normal text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                    Google Maps
                                </h3>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                                    Diese Webseite verwendet Google Maps für die Darstellung von Karteninformationen. Bei der Nutzung von Google Maps werden von Google auch Daten über die Nutzung der Maps-Funktionen durch Besucher der Webseiten erhoben, verarbeitet und genutzt. Nähere Informationen über die Datenverarbeitung durch Google können Sie den Datenschutzhinweisen von Google auf <a href="https://www.google.at/intl/de/policies/privacy/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#A8B536' }}>https://www.google.at/intl/de/policies/privacy/</a> entnehmen. Dort können Sie im Datenschutzcenter auch Ihre Einstellungen verändern, so dass Sie Ihre Daten verwalten und schützen können.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-normal text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                    Datenschutzerklärung für die Nutzung von Facebook
                                </h3>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                                    Auf unseren Seiten sind Plugins des sozialen Netzwerks Facebook, 1601 South California Avenue, Palo Alto, CA 94304, USA integriert. Die Facebook-Plugins erkennen Sie an dem Facebook-Logo oder dem „Like-Button" („Gefällt mir") auf unserer Seite. Eine Übersicht über die Facebook-Plugins finden Sie hier: <a href="https://developers.facebook.com/docs/plugins/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#A8B536' }}>https://developers.facebook.com/docs/plugins/</a>. Wenn Sie unsere Seiten besuchen, wird über das Plugin eine direkte Verbindung zwischen Ihrem Browser und dem Facebook-Server hergestellt. Facebook erhält dadurch die Information, dass Sie mit Ihrer IP-Adresse unsere Seite besucht haben. Wenn Sie den Facebook „Like-Button" anklicken während Sie in Ihrem Facebook-Account eingeloggt sind, können Sie die Inhalte unserer Seiten auf Ihrem Facebook-Profil verlinken. Dadurch kann Facebook den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Facebook erhalten. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Facebook unter <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#A8B536' }}>https://www.facebook.com/policy.php</a>. Wenn Sie nicht wünschen, dass Facebook den Besuch unserer Seiten Ihrem Facebook-Nutzerkonto zuordnen kann, loggen Sie sich bitte aus Ihrem Facebook-Benutzerkonto aus.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-normal text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                    Datenschutzerklärung für die Nutzung von Twitter
                                </h3>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                                    Auf unserer Webseite sind Funktionen des Dienstes Twitter eingebunden. Diese Funktionen werden durch die Twitter Inc., Twitter, Inc. 1355 Market St, Suite 900, San Francisco, CA 94103, USA angeboten. Durch das Benutzen von Twitter und den Funktionen der Twitter-Buttons, werden die von Ihnen besuchten Webseiten mit Ihrem Twitter-Account verknüpft und anderen Nutzern bekannt gegeben. Dabei werden auch Daten an Twitter übertragen. Wir weisen darauf hin, dass wir als Anbieter der Webseite keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Twitter erhalten. Weitere Informationen hierzu finden Sie in der Datenschutzrichtline von Twitter unter <a href="https://twitter.com/privacy?lang=de" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#A8B536' }}>https://twitter.com/privacy?lang=de</a>. Ihre Datenschutzeinstellungen bei Twitter können Sie in den Konto-Einstellungen unter <a href="https://twitter.com/settings/account" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#A8B536' }}>https://twitter.com/settings/account</a> ändern.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-normal text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                    Datenschutzerklärung für die Nutzung von YouTube
                                </h3>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                                    Auf unserer Webseite sind Funktionen des Dienstes YouTube implementiert. Diese Funktionen werden durch die YouTube, LLC, 901 Cherry Ave., San Bruno, CA 94066, USA angeboten. Die eingebundenen Videos legen bei dem Aufrufen der Webseite Cookies auf den Computern der User ab. Wer das Setzen von Cookies für das Google-Werbeprogramm deaktiviert hat, wird auch beim Aufrufen von YouTube-Videos mit keinen solchen Cookies rechnen müssen. YouTube legt aber auch in anderen Cookies nicht-personenbezogene Nutzungsinformationen ab. Möchten Sie dies verhindern, müssen Sie das im Browser blockieren.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-normal text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                    Datenschutzerklärung für die Nutzung von Instagram
                                </h3>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                                    Auf unserer Webseite sind Funktionen des Dienstes Instagram eingebunden. Diese Funktionen werden angeboten durch die Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025, USA integriert. Wenn Sie in Ihren Instagram-Account eingeloggt sind, können Sie durch Anklicken des Instagram-Buttons die Inhalte unserer Seiten mit Ihrem Instagram-Profil verlinken. Dadurch kann Instagram den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Instagram erhalten. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Instagram auf <a href="https://www.instagram.com/about/legal/privacy/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#A8B536' }}>https://www.instagram.com/about/legal/privacy/</a>.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-normal text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                    Datenschutzerklärung für Google Adsense
                                </h3>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                                    Diese Website benutzt Google AdSense, einen Dienst zum Einbinden von Werbeanzeigen der Google Inc. („Google"). Google AdSense verwendet sog. „Cookies", Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website ermöglicht. Google AdSense verwendet auch so genannte Web Beacons (unsichtbare Grafiken). Durch diese Web Beacons können Informationen wie der Besucherverkehr auf diesen Seiten ausgewertet werden. Die durch Cookies und Web Beacons erzeugten Informationen über die Benutzung dieser Website (einschließlich Ihrer IP-Adresse) und Auslieferung von Werbeformaten werden an einen Server von Google in den USA übertragen und dort gespeichert. Diese Informationen können von Google an Vertragspartner von Google weiter gegeben werden. Google wird Ihre IP-Adresse jedoch nicht mit anderen von Ihnen gespeicherten Daten zusammenführen. Sie können die Installation der Cookies durch eine entsprechende Einstellung Ihrer Browser Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung dieser Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg sm:text-xl xl:text-lg 2xl:text-xl font-normal text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                    Auskunftsrecht
                                </h3>
                                <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                                    Sie haben jederzeit das Recht auf Auskunft über die bezüglich Ihrer Person gespeicherten Daten, deren Herkunft und Empfänger sowie den Zweck der Speicherung.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Impressum;