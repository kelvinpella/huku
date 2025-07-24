import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sera ya Faragha – hukutz.com",
  description:
    "Sera rasmi ya Faragha ya hukutz.com. Soma kuhusu jinsi tunavyokusanya, kuhifadhi, na kutumia taarifa zako binafsi. Tunahakikisha usalama wa taarifa zako na tunaheshimu haki yako ya faragha.",
};

export default function PrivacyPolicy() {
  return (
    <div className="w-full lg:max-w-screen-lg mx-auto px-2 py-6 my-12">
      <h1>Sera ya Faragha</h1>

      <p>
        <strong>hukutz.com</strong> tumejitolea kulinda na kuheshimu faragha
        yako. Ikiwa una maswali kuhusu taarifa zako binafsi tafadhali wasiliana
        nasi.
      </p>

      <h2>Taarifa Tunazokusanya Kuhusu Wewe</h2>
      <p>Aina ya taarifa tunazokusanya ni pamoja na:</p>
      <ul className="list-disc list-inside">
        <li>Jina lako au jina la mtumiaji</li>
        <li>Anuani yako ya barua pepe (iliyotumika wakati wa usajili).</li>
        <li>Tarehe na muda wa weka tangazo kwenye tovuti.</li>
        <li>Maelezo kuhusu tangazo lako.</li>
        <li>Taarifa nyingine utakazo toa ili kuwezesha kupata huduma hii</li>
      </ul>

      <p>Tunakusanya baadhi au taarifa zote hizi katika njia zifuatazo:</p>
      <ul className="list-disc list-inside">
        <li>Unapojisajili kama mwanachama wa tovuti hii.</li>
        <li>Unapojaza fomu ya mawasiliano.</li>
        <li>Unapotembelea tovuti hii.</li>
        <li>Unapojaza sehemu katika wasifu wako.</li>
      </ul>

      <h2>Matumizi ya Taarifa Zako Binafsi</h2>
      <p>Tunaweza kutumia taarifa zako binafsi kwa njia zifuatazo:</p>
      <ul className="list-disc list-inside">
        <li>
          Kutunza kumbukumbu za wanaotembelea ya tovuti kwa ajili ya usalama na
          uthabiti wa mfumo wetu.
        </li>
        <li>
          Kukuwezesha kuwa mwanachama aliyesajiliwa na kuchangia matangazo
          kwenye tovuti hii.
        </li>
        <li>
          Kukutumia barua pepe kukujulisha kuhusu shughuli mbalimbali kwenye
          tovuti.
        </li>
        <li>
          Kuwasiliana na wanachama wote mara kwa mara kwa matangazo muhimu
          kupitia barua pepe.
        </li>
      </ul>

      <p>
        Tunaweza pia kukusanya taarifa ambazo hazikufanyi utambulike moja kwa
        moja, kama vile aina ya kifaa unachotumia. Hii ni kwa madhumuni ya
        uchambuzi na kufuatilia idadi ya watembeleaji wa tovuti yetu.
      </p>

      <h2>Ulinzi wa Taarifa Zako</h2>
      <p>
        hukutz.com imejizatiti kuhakikisha kuwa taarifa zote unazotupatia ziko
        salama. Tumetekeleza hatua na taratibu stahiki za kuzuia uvujaji wa
        taarifa binafsi.
      </p>

      <h2>Sera ya cookies</h2>
      <p>
        Cookies ni mafaili madogo ya maandishi tunayoweka kwenye kompyuta yako
        ili kuwezesha huduma fulani, kama vile kuingia kwenye akaunti bila
        kuweka nywila ( password ) mara kwa mara. Unaweza kusoma zaidi kuhusu
        matumizi yetu ya cookies.
      </p>

      <h2>Haki Zako</h2>
      <p>Una haki ya:</p>
      <ul className="list-disc list-inside">
        {/* <li>Kuomba nakala ya taarifa binafsi tunazohifadhi kukuhusu.</li> */}
        <li>Kurekebisha au kukamilisha taarifa zisizo sahihi au pungufu.</li>
        <li>Kuomba tufute taarifa zako kabisa kutoka kwenye mfumo wetu.</li>
      </ul>

      <h2>Uthibitisho wa Kukubali Sera</h2>
      <p>
        Kuendelea kutumia tovuti yetu kunathibitisha kwamba umekubaliana na sera
        hii. Ikiwa hukubaliani nayo, tafadhali usitumie tovuti hii.
      </p>

      <h2>Mabadiliko ya Sera Hii</h2>
      <p>
        <strong>hukutz.com</strong> inaweza kufanya mabadiliko kwenye sera hii
        wakati wowote. Unaweza kuombwa kupitia na kukubali upya sera hii ikiwa
        kutakuwa na mabadiliko ya muhimu siku zijazo.
      </p>
    </div>
  );
}
