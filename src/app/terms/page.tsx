import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masharti ya Matumizi – hukutz.com",
  description:
    "Soma masharti ya matumizi ya hukutz.com. Masharti rasmi ya hukutz.com kuhusu matumizi ya huduma, maudhui ya watumiaji, na haki zako kama mtumiaji.",
};

export default function TermsNotice() {
  return (
    <div className="w-full lg:max-w-screen-lg mx-auto px-2 py-6 my-12">
      <h1 className="text-2xl font-bold">Masharti ya Matumizi</h1>

      <p>
        <strong>hukutz.com</strong> haihusiki na matangazo ya kazi yoyote
        yanayochapishwa na watumiaji. Matangazo yaliyowasilishwa yanaakisi maoni
        ya waandishi wake pekee.
      </p>

      <p>
        Unakubali kutotumia Huduma hii kuchapisha au kuhusisha matangazo yoyote
        ambayo ni ya kashfa, matusi, chuki, vitisho, spam au yanayofanana na
        spam, yanaweza kukera, yana maudhui ya watu wazima au yasiyofaa, yana
        taarifa binafsi za wengine, yanakiuka hakimiliki, yanahamasisha uhalifu
        au yanakiuka sheria yoyote.
      </p>

      <p>
        Matangazo yote unayowasilisha <strong>YANAWEZA</strong> kukaguliwa na
        timu yetu ya usimamizi. Pia yanaweza kutumwa kwenye huduma zingine za
        uthibitishaji (ikiwemo huduma za kuzuia spam). Tafadhali soma mwongozo
        wetu kwa taarifa zaidi.
      </p>

      <p>
        Tunahifadhi haki ya kuondoa au kurekebisha matangazo yoyote
        yaliyowasilishwa kwa sababu yoyote ya msingi bila kutoa maelezo. Maombi
        ya kuondoa au kurekebisha matangazo yatazingatiwa kwa hiari yetu pekee.
        Tunahifadhi haki ya kuchukua hatua dhidi ya akaunti yoyote wakati
        wowote.
      </p>

      <p>
        Unatupatia uhuru wa kudumu, usioweza kubatilishwa na usio na kikomo wa
        kutumia, kuchapisha au kuchapisha tena matangazo yako katika muktadha wa
        huduma ya hukutz.com. Hata hivyo, unabaki na hakimiliki ya matangazo
        yako.
      </p>

      <p>
        Tunaheshimu haki yako ya kusahaulika na unaweza kufuta au akaunti yako
        wakati wowote.
      </p>

      <p>
        Masharti haya yanaweza kubadilishwa wakati wowote bila taarifa. Ikiwa
        hukubaliani na masharti haya, tafadhali usijisajili wala kutumia huduma
        hii.
      </p>
    </div>
  );
}
