// Result.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { questions } from "../Preference/Preference";

// 20가지 다이어트 설명
const dietDescriptions = {
  "저탄수화물 다이어트": "저탄수화물 다이어트는 탄수화물 섭취를 줄이고 단백질과 지방 위주의 식사를 통해 체중 감량을 유도하는 방법입니다. 빵, 쌀, 면 등의 탄수화물을 최소화하며, 고기, 생선, 아보카도, 견과류 등을 주로 섭취합니다. 이 다이어트는 혈당 수치를 안정시키고 체지방 감소에 효과적입니다.",
  "고단백 다이어트": "고단백 다이어트는 단백질 섭취를 늘려 근육량을 유지하고 체지방을 줄이는 방식입니다. 닭가슴살, 달걀, 콩류, 생선, 유제품 등을 포함한 식단으로 구성되며, 운동과 병행하면 근육 회복과 성장에 큰 도움이 됩니다. 포만감이 높아 과식을 줄이는 데도 효과적입니다.",
  "간헐적 단식": "간헐적 단식은 하루 중 일정 시간 동안만 음식을 섭취하는 다이어트 방법입니다. 대표적으로 16:8 방식(16시간 공복, 8시간 식사)이 있으며, 체중 감량과 함께 인슐린 민감도를 개선하고 소화를 돕는 효과가 있습니다. 단, 공복 상태에서 충분한 수분 섭취가 중요합니다.",
  "케토 다이어트": "케토 다이어트는 극단적으로 탄수화물을 줄이고 지방 섭취를 늘려 체내 케톤 생성을 유도하는 다이어트입니다. 아보카도, 코코넛 오일, 버터, 견과류 등을 주로 섭취하며, 체지방을 에너지원으로 사용해 체중 감량에 효과적입니다. 초기에는 '케토 플루' 증상이 나타날 수 있습니다.",
  "지중해식 다이어트": "지중해식 다이어트는 채소, 과일, 통곡물, 올리브 오일, 생선, 견과류를 중심으로 한 식단입니다. 붉은 고기와 가공식품 섭취를 줄이고, 심장 건강과 염증 감소에 도움을 줍니다. 장기적인 건강 개선과 체중 관리에 적합한 지속 가능한 다이어트입니다.",
  "비건 다이어트": "비건 다이어트는 모든 동물성 식품을 배제하고 식물성 식품만 섭취하는 방식입니다. 채소, 과일, 콩류, 통곡물, 견과류를 주로 먹으며, 환경적 지속 가능성과 동물 복지를 고려한 선택입니다. 비타민 B12와 철분 보충이 필요할 수 있습니다.",
  "채식주의 다이어트": "채식주의 다이어트는 고기를 제외한 식단으로, 유제품이나 달걀은 섭취 가능합니다. 채소, 과일, 통곡물, 콩류를 중심으로 하며, 체중 감량과 함께 심혈관 건강 개선에 효과적입니다. 단백질 섭취를 위해 콩류와 유제품을 충분히 섭취해야 합니다.",
  "팔레오 다이어트": "팔레오 다이어트는 구석기 시대의 식단을 모방하여 가공식품, 곡물, 유제품을 피하고 고기, 생선, 채소, 과일, 견과류를 섭취합니다. 자연식 위주의 식단으로 염증 감소와 소화 개선에 도움을 줄 수 있습니다.",
  "저지방 다이어트": "저지방 다이어트는 지방 섭취를 줄이고 탄수화물과 단백질 위주의 식사를 하는 방식입니다. 저지방 유제품, 살코기, 채소, 과일을 주로 섭취하며, 칼로리 섭취를 줄여 체중 감량에 효과적입니다. 단, 건강한 지방(예: 오메가-3)은 적당히 섭취해야 합니다.",
  "균형 다이어트": "균형 다이어트는 탄수화물, 단백질, 지방을 고르게 섭취하며 모든 영양소를 균형 있게 포함하는 식단입니다. 채소, 과일, 통곡물, 단백질, 유제품을 골고루 먹으며, 장기적인 건강과 체중 관리를 목표로 합니다.",
  "대시 다이어트": "대시 다이어트는 고혈압 예방을 위해 설계된 식단으로, 나트륨 섭취를 줄이고 채소, 과일, 통곡물, 저지방 유제품, 살코기를 섭취합니다. 심장 건강과 혈압 관리에 효과적이며, 체중 감량에도 도움이 됩니다.",
  "저나트륨 다이어트": "저나트륨 다이어트는 소금 섭취를 줄여 혈압을 관리하고 부종을 줄이는 방식입니다. 신선한 채소, 과일, 통곡물을 주로 먹으며, 가공식품과 짠 음식을 피합니다. 심장 건강과 신장 기능 개선에 도움을 줍니다.",
  "글루텐 프리 다이어트": "글루텐 프리 다이어트는 글루텐(밀, 보리 등에 포함)을 피하는 식단으로, 셀리악병이나 글루텐 민감증이 있는 사람에게 적합합니다. 쌀, 퀴노아, 채소, 과일을 주로 섭취하며, 소화 건강 개선에 효과적입니다.",
  "홀30 다이어트": "홀30 다이어트는 30일 동안 설탕, 알코올, 곡물, 유제품, 콩류를 제외한 자연식만 섭취하는 프로그램입니다. 고기, 채소, 과일, 견과류를 중심으로 하며, 염증 감소와 식습관 리셋에 도움을 줍니다.",
  "플렉시테리언 다이어트": "플렉시테리언 다이어트는 주로 채식을 기반으로 하되, 가끔 고기를 섭취하는 유연한 식단입니다. 채소, 과일, 통곡물을 중심으로 하며, 지속 가능한 식습관과 체중 관리에 적합합니다.",
  "저포드맵 다이어트": "저포드맵 다이어트는 소화가 어려운 탄수화물(FODMAP)을 줄이는 식단으로, 과민성 대장 증후군(IBS) 환자에게 적합합니다. 저포드맵 식품(예: 쌀, 바나나, 닭고기)을 섭취하며, 소화 불편을 줄이는 데 효과적입니다.",
  "항염증 다이어트": "항염증 다이어트는 염증을 줄이는 식품(예: 오메가-3가 풍부한 생선, 베리류, 녹색 채소)을 중심으로 한 식단입니다. 가공식품과 설탕을 피하며, 만성 염증과 관련된 질환 예방에 도움을 줍니다.",
  "디톡스 다이어트": "디톡스 다이어트는 체내 독소를 배출하기 위해 설계된 단기 식단으로, 주로 채소, 과일, 물, 허브차를 섭취합니다. 소화 기관을 쉬게 하고 에너지를 높이는 데 목적이지만, 장기적인 다이어트로는 적합하지 않을 수 있습니다.",
  "로우 푸드 다이어트": "로우 푸드 다이어트는 가열하지 않은 생식 위주의 식단으로, 채소, 과일, 견과류, 씨앗을 주로 섭취합니다. 효소와 영양소 손실을 최소화하며, 소화 개선과 에너지 증진에 효과적입니다.",
  "존 다이어트": "존 다이어트는 탄수화물, 단백질, 지방을 40:30:30 비율로 섭취하여 호르몬 균형을 맞추는 식단입니다. 각 식사에서 이 비율을 유지하며, 혈당 안정과 체중 감량에 도움을 줍니다."
};

// 다이어트별 선택 이유 (가중치 문구 제거)
const dietSelectionReasons = {
  "저탄수화물 다이어트": (answers) => {
    const reasons = [];
    const carbIntakeIndex = questions.indexOf("나는 탄수화물이 포함된 음식을 자주 먹는다.");
    const carbReductionIndex = questions.indexOf("나는 탄수화물 섭취를 줄이려고 노력한다.");
    const meatPreferenceIndex = questions.indexOf("나는 고기를 즐겨 먹는다.");
    const exerciseIndex = questions.indexOf("나는 운동을 꾸준히 하는 편이다.");

    if (answers[carbIntakeIndex] <= 1) {
      reasons.push(
        "당신은 탄수화물이 포함된 음식을 자주 먹지 않는다고 응답하셨습니다. 저탄수화물 다이어트는 탄수화물 섭취를 줄이는 데 초점을 맞추므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[carbReductionIndex] >= 3) {
      reasons.push(
        "당신은 탄수화물 섭취를 줄이려고 노력한다고 하셨습니다. 저탄수화물 다이어트는 탄수화물을 최소화하고 단백질과 지방을 중심으로 한 식단을 권장하므로 적합합니다."
      );
    }
    if (answers[meatPreferenceIndex] >= 3) {
      reasons.push(
        "당신은 고기를 즐겨 먹는다고 하셨습니다. 저탄수화물 다이어트는 고기와 같은 단백질과 지방이 풍부한 음식을 권장하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[carbReductionIndex] >= 3 && answers[exerciseIndex] >= 3) {
      reasons.push(
        "당신은 탄수화물 섭취를 줄이려고 노력하며 운동을 꾸준히 한다고 하셨습니다. 저탄수화물 다이어트는 운동과 함께 체지방 감소에 효과적이므로, 이러한 생활 패턴과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["저탄수화물 다이어트는 탄수화물 섭취를 줄이고 단백질과 지방을 중심으로 한 식단을 권장합니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "고단백 다이어트": (answers) => {
    const reasons = [];
    const proteinIntakeIndex = questions.indexOf("나는 단백질이 풍부한 음식을 자주 섭취한다.");
    const exerciseIndex = questions.indexOf("나는 운동을 꾸준히 하는 편이다.");
    const meatPreferenceIndex = questions.indexOf("나는 고기를 즐겨 먹는다.");
    const dairyIndex = questions.indexOf("나는 유제품(우유, 치즈 등)을 즐겨 먹는다.");

    if (answers[proteinIntakeIndex] >= 3) {
      reasons.push(
        "당신은 단백질이 풍부한 음식을 자주 섭취한다고 하셨습니다. 고단백 다이어트는 단백질 섭취를 늘려 근육량을 유지하고 체지방을 줄이는 데 초점을 맞추므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[exerciseIndex] >= 3) {
      reasons.push(
        "당신은 운동을 꾸준히 한다고 하셨습니다. 고단백 다이어트는 운동과 병행할 때 근육 회복과 성장에 큰 도움이 되므로, 당신의 활동 패턴에 적합합니다."
      );
    }
    if (answers[meatPreferenceIndex] >= 3) {
      reasons.push(
        "당신은 고기를 즐겨 먹는다고 하셨습니다. 고단백 다이어트는 고기와 같은 단백질이 풍부한 음식을 권장하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[dairyIndex] >= 3) {
      reasons.push(
        "당신은 유제품을 즐겨 먹는다고 하셨습니다. 고단백 다이어트는 유제품과 같은 단백질 공급원을 권장하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[proteinIntakeIndex] >= 3 && answers[exerciseIndex] >= 3) {
      reasons.push(
        "당신은 단백질 섭취를 선호하며 운동을 꾸준히 한다고 하셨습니다. 고단백 다이어트는 근육 회복과 성장을 지원하므로, 이러한 생활 패턴과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["고단백 다이어트는 단백질 섭취를 늘려 근육량을 유지하고 체지방을 줄이는 데 초점을 맞춥니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "간헐적 단식": (answers) => {
    const reasons = [];
    const breakfastIndex = questions.indexOf("나는 아침 식사를 거르는 편이다.");
    const lateSnackIndex = questions.indexOf("나는 밤늦게 야식을 자주 먹는다.");
    const regularMealIndex = questions.indexOf("나는 규칙적으로 식사를 한다.");
    const waterIndex = questions.indexOf("나는 하루에 물을 2L 이상 마신다.");

    if (answers[breakfastIndex] >= 3) {
      reasons.push(
        "당신은 아침 식사를 거르는 편이라고 하셨습니다. 간헐적 단식은 하루 중 일정 시간 동안만 음식을 섭취하는 방식으로, 아침을 거르는 습관이 공복 시간을 늘리는 데 유리합니다."
      );
    }
    if (answers[lateSnackIndex] <= 1) {
      reasons.push(
        "당신은 밤늦게 야식을 자주 먹지 않는다고 하셨습니다. 간헐적 단식은 식사 시간을 조절하는 데 초점을 맞추므로, 야식을 피하는 습관이 이 다이어트와 잘 맞습니다."
      );
    }
    if (answers[regularMealIndex] <= 1) {
      reasons.push(
        "당신은 규칙적으로 식사를 하지 않는다고 하셨습니다. 간헐적 단식은 식사 시간을 유연하게 조정할 수 있어, 이러한 식사 패턴과 잘 맞습니다."
      );
    }
    if (answers[waterIndex] >= 3) {
      reasons.push(
        "당신은 하루에 물을 2L 이상 마신다고 하셨습니다. 간헐적 단식은 공복 상태에서 충분한 수분 섭취가 중요하므로, 이러한 습관과 잘 맞습니다."
      );
    }
    if (answers[breakfastIndex] >= 3 && answers[lateSnackIndex] <= 1) {
      reasons.push(
        "당신은 아침 식사를 거르고 야식을 피한다고 하셨습니다. 간헐적 단식은 식사 시간을 조절하는 데 유리하므로, 이러한 식사 패턴과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["간헐적 단식은 하루 중 일정 시간 동안만 음식을 섭취하는 방식입니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "케토 다이어트": (answers) => {
    const reasons = [];
    const fatPreferenceIndex = questions.indexOf("나는 지방 함량이 적은 음식을 선호한다.");
    const carbReductionIndex = questions.indexOf("나는 탄수화물 섭취를 줄이려고 노력한다.");
    const meatPreferenceIndex = questions.indexOf("나는 고기를 즐겨 먹는다.");
    const exerciseIndex = questions.indexOf("나는 운동을 꾸준히 하는 편이다.");

    if (answers[fatPreferenceIndex] <= 1) {
      reasons.push(
        "당신은 지방 함량이 적은 음식을 선호하지 않는다고 하셨습니다. 케토 다이어트는 지방 섭취를 늘려 체내 케톤 생성을 유도하므로, 지방 섭취에 거부감이 없는 당신에게 적합합니다."
      );
    }
    if (answers[carbReductionIndex] >= 3) {
      reasons.push(
        "당신은 탄수화물 섭취를 줄이려고 노력한다고 하셨습니다. 케토 다이어트는 탄수화물을 극단적으로 줄이는 방식이므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[meatPreferenceIndex] >= 3) {
      reasons.push(
        "당신은 고기를 즐겨 먹는다고 하셨습니다. 케토 다이어트는 고기와 같은 단백질과 지방이 풍부한 음식을 권장하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[carbReductionIndex] >= 3 && answers[exerciseIndex] >= 3) {
      reasons.push(
        "당신은 탄수화물 섭취를 줄이려고 노력하며 운동을 꾸준히 한다고 하셨습니다. 케토 다이어트는 운동과 함께 체지방을 에너지원으로 사용하여 체중 감량에 효과적이므로, 이러한 생활 패턴과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["케토 다이어트는 탄수화물을 줄이고 지방 섭취를 늘리는 방식입니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "지중해식 다이어트": (answers) => {
    const reasons = [];
    const seafoodIndex = questions.indexOf("나는 해산물을 좋아하는 편이다.");
    const vegetableIndex = questions.indexOf("나는 채소를 자주 섭취한다.");
    const fruitIndex = questions.indexOf("나는 과일을 자주 섭취한다.");
    const processedFoodIndex = questions.indexOf("나는 가공식품(라면, 인스턴트 등)을 자주 섭취한다.");
    const meatPreferenceIndex = questions.indexOf("나는 고기를 즐겨 먹는다.");
    const healthConsiderationIndex = questions.indexOf("나는 건강을 고려하여 식단을 계획한다.");

    if (answers[seafoodIndex] >= 3) {
      reasons.push(
        "당신은 해산물을 좋아한다고 하셨습니다. 지중해식 다이어트는 생선과 같은 해산물을 통해 오메가-3 지방산을 섭취하는 것을 권장하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 채소를 자주 섭취한다고 하셨습니다. 지중해식 다이어트는 채소 섭취를 강조하여 섬유질과 항산화제를 풍부하게 공급하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[fruitIndex] >= 3) {
      reasons.push(
        "당신은 과일을 자주 섭취한다고 하셨습니다. 지중해식 다이어트는 과일을 통해 비타민과 항산화제를 섭취하는 것을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[processedFoodIndex] <= 1) {
      reasons.push(
        "당신은 가공식품을 자주 섭취하지 않는다고 하셨습니다. 지중해식 다이어트는 가공식품 섭취를 줄이고 자연식 위주의 식단을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[meatPreferenceIndex] <= 2) {
      reasons.push(
        "당신은 고기를 많이 즐겨 먹지 않는다고 하셨습니다. 지중해식 다이어트는 붉은 고기 섭취를 줄이고 생선과 식물성 단백질을 권장하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[healthConsiderationIndex] >= 3) {
      reasons.push(
        "당신은 건강을 고려하여 식단을 계획한다고 하셨습니다. 지중해식 다이어트는 장기적인 건강 개선을 목표로 하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[vegetableIndex] >= 3 && answers[seafoodIndex] >= 3) {
      reasons.push(
        "당신은 채소를 자주 섭취하고 해산물을 좋아한다고 하셨습니다. 지중해식 다이어트는 채소와 해산물을 중심으로 한 식단을 권장하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["지중해식 다이어트는 채소, 과일, 해산물, 통곡물을 중심으로 한 식단입니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "비건 다이어트": (answers) => {
    const reasons = [];
    const meatPreferenceIndex = questions.indexOf("나는 고기를 즐겨 먹는다.");
    const vegetableIndex = questions.indexOf("나는 채소를 자주 섭취한다.");
    const dairyIndex = questions.indexOf("나는 유제품(우유, 치즈 등)을 즐겨 먹는다.");
    const beanIndex = questions.indexOf("나는 콩류(두부, 콩, 된장 등)를 자주 섭취한다.");

    if (answers[meatPreferenceIndex] <= 1) {
      reasons.push(
        "당신은 고기를 즐겨 먹지 않는다고 하셨습니다. 비건 다이어트는 모든 동물성 식품을 배제하므로, 고기를 피하는 식습관과 잘 맞습니다."
      );
    }
    if (answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 채소를 자주 섭취한다고 하셨습니다. 비건 다이어트는 식물성 식품을 중심으로 하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[dairyIndex] <= 1) {
      reasons.push(
        "당신은 유제품을 즐겨 먹지 않는다고 하셨습니다. 비건 다이어트는 유제품을 배제하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[beanIndex] >= 3) {
      reasons.push(
        "당신은 콩류를 자주 섭취한다고 하셨습니다. 비건 다이어트는 콩류를 통해 단백질을 섭취하는 것을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[meatPreferenceIndex] <= 1 && answers[dairyIndex] <= 1) {
      reasons.push(
        "당신은 고기와 유제품을 모두 피한다고 하셨습니다. 비건 다이어트는 동물성 식품을 배제하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["비건 다이어트는 모든 동물성 식품을 배제하고 식물성 식품만 섭취하는 방식입니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "채식주의 다이어트": (answers) => {
    const reasons = [];
    const meatPreferenceIndex = questions.indexOf("나는 고기를 즐겨 먹는다.");
    const vegetableIndex = questions.indexOf("나는 채소를 자주 섭취한다.");
    const dairyIndex = questions.indexOf("나는 유제품(우유, 치즈 등)을 즐겨 먹는다.");
    const beanIndex = questions.indexOf("나는 콩류(두부, 콩, 된장 등)를 자주 섭취한다.");

    if (answers[meatPreferenceIndex] <= 1) {
      reasons.push(
        "당신은 고기를 즐겨 먹지 않는다고 하셨습니다. 채식주의 다이어트는 고기를 제외한 식단을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 채소를 자주 섭취한다고 하셨습니다. 채식주의 다이어트는 식물성 식품을 중심으로 하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[dairyIndex] >= 3) {
      reasons.push(
        "당신은 유제품을 즐겨 먹는다고 하셨습니다. 채식주의 다이어트는 유제품 섭취를 허용하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[beanIndex] >= 3) {
      reasons.push(
        "당신은 콩류를 자주 섭취한다고 하셨습니다. 채식주의 다이어트는 콩류를 통해 단백질을 섭취하는 것을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[meatPreferenceIndex] <= 1 && answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 고기를 피하고 채소를 자주 섭취한다고 하셨습니다. 채식주의 다이어트는 고기를 제외하고 식물성 식품을 중심으로 하므로, 이러한 식습관과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["채식주의 다이어트는 고기를 제외한 식단으로, 유제품과 달걀은 섭취 가능합니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "팔레오 다이어트": (answers) => {
    const reasons = [];
    const processedFoodIndex = questions.indexOf("나는 가공식품(라면, 인스턴트 등)을 자주 섭취한다.");
    const meatPreferenceIndex = questions.indexOf("나는 고기를 즐겨 먹는다.");
    const dairyIndex = questions.indexOf("나는 유제품(우유, 치즈 등)을 즐겨 먹는다.");
    const grainIndex = questions.indexOf("나는 통곡물을 즐겨 먹는다.");

    if (answers[processedFoodIndex] <= 1) {
      reasons.push(
        "당신은 가공식품을 자주 섭취하지 않는다고 하셨습니다. 팔레오 다이어트는 가공식품을 피하고 자연식 위주의 식단을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[meatPreferenceIndex] >= 3) {
      reasons.push(
        "당신은 고기를 즐겨 먹는다고 하셨습니다. 팔레오 다이어트는 고기 섭취를 권장하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[dairyIndex] <= 1) {
      reasons.push(
        "당신은 유제품을 즐겨 먹지 않는다고 하셨습니다. 팔레오 다이어트는 유제품을 배제하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[grainIndex] <= 1) {
      reasons.push(
        "당신은 통곡물을 즐겨 먹지 않는다고 하셨습니다. 팔레오 다이어트는 곡물을 배제하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[processedFoodIndex] <= 1 && answers[meatPreferenceIndex] >= 3) {
      reasons.push(
        "당신은 가공식품을 피하고 고기를 즐겨 먹는다고 하셨습니다. 팔레오 다이어트는 자연식과 고기 섭취를 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["팔레오 다이어트는 가공식품, 곡물, 유제품을 피하고 자연식을 권장합니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "저지방 다이어트": (answers) => {
    const reasons = [];
    const fatPreferenceIndex = questions.indexOf("나는 지방 함량이 적은 음식을 선호한다.");
    const oilyFoodIndex = questions.indexOf("나는 기름진 음식을 피하는 편이다.");
    const meatPreferenceIndex = questions.indexOf("나는 고기를 즐겨 먹는다.");
    const vegetableIndex = questions.indexOf("나는 채소를 자주 섭취한다.");

    if (answers[fatPreferenceIndex] >= 3) {
      reasons.push(
        "당신은 지방 함량이 적은 음식을 선호한다고 하셨습니다. 저지방 다이어트는 지방 섭취를 줄이는 데 초점을 맞추므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[oilyFoodIndex] >= 3) {
      reasons.push(
        "당신은 기름진 음식을 피한다고 하셨습니다. 저지방 다이어트는 기름진 음식을 줄이고 저지방 식품을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[meatPreferenceIndex] <= 2) {
      reasons.push(
        "당신은 고기를 많이 즐겨 먹지 않는다고 하셨습니다. 저지방 다이어트는 고지방 고기를 줄이고 살코기를 권장하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 채소를 자주 섭취한다고 하셨습니다. 저지방 다이어트는 채소와 같은 저지방 식품을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[fatPreferenceIndex] >= 3 && answers[oilyFoodIndex] >= 3) {
      reasons.push(
        "당신은 지방 함량이 적은 음식을 선호하고 기름진 음식을 피한다고 하셨습니다. 저지방 다이어트는 지방 섭취를 줄이는 데 초점을 맞추므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["저지방 다이어트는 지방 섭취를 줄이고 탄수화물과 단백질 위주의 식사를 권장합니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "균형 다이어트": (answers) => {
    const reasons = [];
    const healthConsiderationIndex = questions.indexOf("나는 건강을 고려하여 식단을 계획한다.");
    const regularMealIndex = questions.indexOf("나는 규칙적으로 식사를 한다.");
    const vegetableIndex = questions.indexOf("나는 채소를 자주 섭취한다.");
    const fruitIndex = questions.indexOf("나는 과일을 자주 섭취한다.");

    if (answers[healthConsiderationIndex] >= 3) {
      reasons.push(
        "당신은 건강을 고려하여 식단을 계획한다고 하셨습니다. 균형 다이어트는 모든 영양소를 고르게 섭취하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[regularMealIndex] >= 3) {
      reasons.push(
        "당신은 규칙적으로 식사를 한다고 하셨습니다. 균형 다이어트는 규칙적인 식사 패턴을 권장하므로, 이러한 식사 습관과 잘 맞습니다."
      );
    }
    if (answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 채소를 자주 섭취한다고 하셨습니다. 균형 다이어트는 채소와 같은 다양한 식품군을 포함하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[fruitIndex] >= 3) {
      reasons.push(
        "당신은 과일을 자주 섭취한다고 하셨습니다. 균형 다이어트는 과일을 통해 비타민과 섬유질을 섭취하는 것을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[healthConsiderationIndex] >= 3 && answers[regularMealIndex] >= 3) {
      reasons.push(
        "당신은 건강을 고려하여 식단을 계획하고 규칙적으로 식사한다고 하셨습니다. 균형 다이어트는 규칙적이고 균형 잡힌 식사를 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["균형 다이어트는 모든 영양소를 고르게 섭취하는 식단입니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "대시 다이어트": (answers) => {
    const reasons = [];
    const saltIndex = questions.indexOf("나는 음식을 조리할 때 소금을 적게 사용한다.");
    const vegetableIndex = questions.indexOf("나는 채소를 자주 섭취한다.");
    const processedFoodIndex = questions.indexOf("나는 가공식품(라면, 인스턴트 등)을 자주 섭취한다.");
    const healthConsiderationIndex = questions.indexOf("나는 건강을 고려하여 식단을 계획한다.");

    if (answers[saltIndex] >= 3) {
      reasons.push(
        "당신은 음식을 조리할 때 소금을 적게 사용한다고 하셨습니다. 대시 다이어트는 나트륨 섭취를 줄이는 데 초점을 맞추므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 채소를 자주 섭취한다고 하셨습니다. 대시 다이어트는 채소 섭취를 통해 혈압 관리와 건강 개선을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[processedFoodIndex] <= 1) {
      reasons.push(
        "당신은 가공식품을 자주 섭취하지 않는다고 하셨습니다. 대시 다이어트는 가공식품 섭취를 줄이고 자연식을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[healthConsiderationIndex] >= 3) {
      reasons.push(
        "당신은 건강을 고려하여 식단을 계획한다고 하셨습니다. 대시 다이어트는 혈압 관리와 건강 개선을 목표로 하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[saltIndex] >= 3 && answers[processedFoodIndex] <= 1) {
      reasons.push(
        "당신은 소금을 적게 사용하고 가공식품을 피한다고 하셨습니다. 대시 다이어트는 나트륨 섭취를 줄이는 데 초점을 맞추므로, 이러한 식습관과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["대시 다이어트는 나트륨 섭취를 줄이고 채소와 통곡물을 권장합니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "저나트륨 다이어트": (answers) => {
    const reasons = [];
    const saltIndex = questions.indexOf("나는 음식을 조리할 때 소금을 적게 사용한다.");
    const processedFoodIndex = questions.indexOf("나는 가공식품(라면, 인스턴트 등)을 자주 섭취한다.");
    const vegetableIndex = questions.indexOf("나는 채소를 자주 섭취한다.");
    const healthConsiderationIndex = questions.indexOf("나는 건강을 고려하여 식단을 계획한다.");

    if (answers[saltIndex] >= 3) {
      reasons.push(
        "당신은 음식을 조리할 때 소금을 적게 사용한다고 하셨습니다. 저나트륨 다이어트는 소금 섭취를 줄여 혈압을 관리하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[processedFoodIndex] <= 1) {
      reasons.push(
        "당신은 가공식품을 자주 섭취하지 않는다고 하셨습니다. 저나트륨 다이어트는 가공식품 섭취를 줄이고 신선한 식품을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 채소를 자주 섭취한다고 하셨습니다. 저나트륨 다이어트는 신선한 채소를 통해 나트륨 섭취를 줄이므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[healthConsiderationIndex] >= 3) {
      reasons.push(
        "당신은 건강을 고려하여 식단을 계획한다고 하셨습니다. 저나트륨 다이어트는 혈압 관리와 건강 개선을 목표로 하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[saltIndex] >= 3 && answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 소금을 적게 사용하고 채소를 자주 섭취한다고 하셨습니다. 저나트륨 다이어트는 나트륨 섭취를 줄이고 신선한 채소를 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["저나트륨 다이어트는 소금 섭취를 줄여 혈압을 관리하는 방식입니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "글루텐 프리 다이어트": (answers) => {
    const reasons = [];
    const grainIndex = questions.indexOf("나는 통곡물을 즐겨 먹는다.");
    const vegetableIndex = questions.indexOf("나는 채소를 자주 섭취한다.");
    const carbIntakeIndex = questions.indexOf("나는 탄수화물이 포함된 음식을 자주 먹는다.");
    const healthConsiderationIndex = questions.indexOf("나는 건강을 고려하여 식단을 계획한다.");

    if (answers[grainIndex] <= 1) {
      reasons.push(
        "당신은 통곡물을 즐겨 먹지 않는다고 하셨습니다. 글루텐 프리 다이어트는 글루텐이 포함된 통곡물을 피하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 채소를 자주 섭취한다고 하셨습니다. 글루텐 프리 다이어트는 채소와 같은 글루텐이 없는 식품을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[carbIntakeIndex] <= 1) {
      reasons.push(
        "당신은 탄수화물이 포함된 음식을 자주 먹지 않는다고 하셨습니다. 글루텐 프리 다이어트는 글루텐이 포함된 탄수화물을 줄이므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[healthConsiderationIndex] >= 3) {
      reasons.push(
        "당신은 건강을 고려하여 식단을 계획한다고 하셨습니다. 글루텐 프리 다이어트는 소화 건강 개선을 목표로 하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[grainIndex] <= 1 && answers[carbIntakeIndex] <= 1) {
      reasons.push(
        "당신은 통곡물과 탄수화물을 자주 섭취하지 않는다고 하셨습니다. 글루텐 프리 다이어트는 글루텐이 포함된 탄수화물을 피하므로, 이러한 식습관과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["글루텐 프리 다이어트는 글루텐을 피하는 식단입니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "홀30 다이어트": (answers) => {
    const reasons = [];
    const processedFoodIndex = questions.indexOf("나는 가공식품(라면, 인스턴트 등)을 자주 섭취한다.");
    const sugarIndex = questions.indexOf("나는 설탕이 적은 음식을 선호한다.");
    const dairyIndex = questions.indexOf("나는 유제품(우유, 치즈 등)을 즐겨 먹는다.");
    const grainIndex = questions.indexOf("나는 통곡물을 즐겨 먹는다.");

    if (answers[processedFoodIndex] <= 1) {
      reasons.push(
        "당신은 가공식품을 자주 섭취하지 않는다고 하셨습니다. 홀30 다이어트는 가공식품을 배제하고 자연식을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[sugarIndex] >= 3) {
      reasons.push(
        "당신은 설탕이 적은 음식을 선호한다고 하셨습니다. 홀30 다이어트는 설탕 섭취를 배제하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[dairyIndex] <= 1) {
      reasons.push(
        "당신은 유제품을 즐겨 먹지 않는다고 하셨습니다. 홀30 다이어트는 유제품을 배제하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[grainIndex] <= 1) {
      reasons.push(
        "당신은 통곡물을 즐겨 먹지 않는다고 하셨습니다. 홀30 다이어트는 곡물을 배제하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[processedFoodIndex] <= 1 && answers[sugarIndex] >= 3) {
      reasons.push(
        "당신은 가공식품을 피하고 설탕이 적은 음식을 선호한다고 하셨습니다. 홀30 다이어트는 가공식품과 설탕을 배제하므로, 이러한 식습관과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["홀30 다이어트는 가공식품, 설탕, 유제품을 배제하는 30일 프로그램입니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "플렉시테리언 다이어트": (answers) => {
    const reasons = [];
    const meatPreferenceIndex = questions.indexOf("나는 고기를 즐겨 먹는다.");
    const vegetableIndex = questions.indexOf("나는 채소를 자주 섭취한다.");
    const fruitIndex = questions.indexOf("나는 과일을 자주 섭취한다.");
    const beanIndex = questions.indexOf("나는 콩류(두부, 콩, 된장 등)를 자주 섭취한다.");

    if (answers[meatPreferenceIndex] <= 2) {
      reasons.push(
        "당신은 고기를 많이 즐겨 먹지 않는다고 하셨습니다. 플렉시테리언 다이어트는 고기 섭취를 줄이고 식물성 식품을 중심으로 하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 채소를 자주 섭취한다고 하셨습니다. 플렉시테리언 다이어트는 식물성 식품 섭취를 강조하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[fruitIndex] >= 3) {
      reasons.push(
        "당신은 과일을 자주 섭취한다고 하셨습니다. 플렉시테리언 다이어트는 과일을 통해 비타민과 섬유질을 섭취하는 것을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[beanIndex] >= 3) {
      reasons.push(
        "당신은 콩류를 자주 섭취한다고 하셨습니다. 플렉시테리언 다이어트는 콩류를 통해 식물성 단백질을 섭취하는 것을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[meatPreferenceIndex] <= 2 && answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 고기 섭취를 줄이고 채소를 자주 섭취한다고 하셨습니다. 플렉시테리언 다이어트는 고기 섭취를 줄이고 식물성 식품을 중심으로 하므로, 이러한 식습관과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["플렉시테리언 다이어트는 주로 채식을 기반으로 하되 고기를 가끔 섭취하는 방식입니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "저포드맵 다이어트": (answers) => {
    const reasons = [];
    const dairyIndex = questions.indexOf("나는 유제품(우유, 치즈 등)을 즐겨 먹는다.");
    const beanIndex = questions.indexOf("나는 콩류(두부, 콩, 된장 등)를 자주 섭취한다.");
    const vegetableIndex = questions.indexOf("나는 채소를 자주 섭취한다.");
    const fruitIndex = questions.indexOf("나는 과일을 자주 섭취한다.");

    if (answers[dairyIndex] <= 1) {
      reasons.push(
        "당신은 유제품을 즐겨 먹지 않는다고 하셨습니다. 저포드맵 다이어트는 유제품과 같은 고포드맵 식품을 줄이므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[beanIndex] <= 1) {
      reasons.push(
        "당신은 콩류를 자주 섭취하지 않는다고 하셨습니다. 저포드맵 다이어트는 콩류와 같은 고포드맵 식품을 줄이므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 채소를 자주 섭취한다고 하셨습니다. 저포드맵 다이어트는 저포드맵 채소(예: 시금치, 당근)를 권장하므로, 채소 섭취를 좋아하는 당신에게 적합합니다."
      );
    }
    if (answers[fruitIndex] >= 3) {
      reasons.push(
        "당신은 과일을 자주 섭취한다고 하셨습니다. 저포드맵 다이어트는 저포드맵 과일(예: 바나나, 오렌지)을 권장하므로, 과일 섭취를 좋아하는 당신에게 적합합니다."
      );
    }
    if (answers[dairyIndex] <= 1 && answers[beanIndex] <= 1) {
      reasons.push(
        "당신은 유제품과 콩류를 자주 섭취하지 않는다고 하셨습니다. 저포드맵 다이어트는 고포드맵 식품을 줄이므로, 이러한 식습관과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["저포드맵 다이어트는 소화가 어려운 탄수화물을 줄이는 방식입니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "항염증 다이어트": (answers) => {
    const reasons = [];
    const seafoodIndex = questions.indexOf("나는 해산물을 좋아하는 편이다.");
    const sugarIndex = questions.indexOf("나는 설탕이 적은 음식을 선호한다.");
    const processedFoodIndex = questions.indexOf("나는 가공식품(라면, 인스턴트 등)을 자주 섭취한다.");
    const vegetableIndex = questions.indexOf("나는 채소를 자주 섭취한다.");

    if (answers[seafoodIndex] >= 3) {
      reasons.push(
        "당신은 해산물을 좋아한다고 하셨습니다. 항염증 다이어트는 오메가-3가 풍부한 생선을 권장하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[sugarIndex] >= 3) {
      reasons.push(
        "당신은 설탕이 적은 음식을 선호한다고 하셨습니다. 항염증 다이어트는 설탕 섭취를 줄여 염증을 감소시키므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[processedFoodIndex] <= 1) {
      reasons.push(
        "당신은 가공식품을 자주 섭취하지 않는다고 하셨습니다. 항염증 다이어트는 가공식품 섭취를 줄이고 자연식을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 채소를 자주 섭취한다고 하셨습니다. 항염증 다이어트는 채소를 통해 항산화제를 섭취하는 것을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[seafoodIndex] >= 3 && answers[processedFoodIndex] <= 1) {
      reasons.push(
        "당신은 해산물을 좋아하고 가공식품을 피한다고 하셨습니다. 항염증 다이어트는 오메가-3가 풍부한 해산물과 자연식을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["항염증 다이어트는 염증을 줄이는 식품을 중심으로 한 식단입니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "디톡스 다이어트": (answers) => {
    const reasons = [];
    const waterIndex = questions.indexOf("나는 하루에 물을 2L 이상 마신다.");
    const fruitIndex = questions.indexOf("나는 과일을 자주 섭취한다.");
    const processedFoodIndex = questions.indexOf("나는 가공식품(라면, 인스턴트 등)을 자주 섭취한다.");
    const vegetableIndex = questions.indexOf("나는 채소를 자주 섭취한다.");

    if (answers[waterIndex] >= 3) {
      reasons.push(
        "당신은 하루에 물을 2L 이상 마신다고 하셨습니다. 디톡스 다이어트는 수분 섭취를 통해 체내 독소 배출을 촉진하므로, 이러한 습관과 잘 맞습니다."
      );
    }
    if (answers[fruitIndex] >= 3) {
      reasons.push(
        "당신은 과일을 자주 섭취한다고 하셨습니다. 디톡스 다이어트는 과일을 통해 비타민과 항산화제를 섭취하는 것을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[processedFoodIndex] <= 1) {
      reasons.push(
        "당신은 가공식품을 자주 섭취하지 않는다고 하셨습니다. 디톡스 다이어트는 가공식품을 줄이고 신선한 식품을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 채소를 자주 섭취한다고 하셨습니다. 디톡스 다이어트는 채소를 통해 비타민과 섬유질을 섭취하는 것을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[waterIndex] >= 3 && answers[processedFoodIndex] <= 1) {
      reasons.push(
        "당신은 물을 많이 마시고 가공식품을 피한다고 하셨습니다. 디톡스 다이어트는 수분 섭취와 자연식을 통해 독소 배출을 촉진하므로, 이러한 식습관과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["디톡스 다이어트는 체내 독소를 배출하기 위해 설계된 단기 식단입니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "로우 푸드 다이어트": (answers) => {
    const reasons = [];
    const vegetableIndex = questions.indexOf("나는 채소를 자주 섭취한다.");
    const fruitIndex = questions.indexOf("나는 과일을 자주 섭취한다.");
    const processedFoodIndex = questions.indexOf("나는 가공식품(라면, 인스턴트 등)을 자주 섭취한다.");
    const grainIndex = questions.indexOf("나는 통곡물을 즐겨 먹는다.");

    if (answers[vegetableIndex] >= 3) {
      reasons.push(
        "당신은 채소를 자주 섭취한다고 하셨습니다. 로우 푸드 다이어트는 생 채소를 통해 효소와 영양소를 섭취하는 것을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[fruitIndex] >= 3) {
      reasons.push(
        "당신은 과일을 자주 섭취한다고 하셨습니다. 로우 푸드 다이어트는 생 과일을 통해 비타민과 항산화제를 섭취하는 것을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[processedFoodIndex] <= 1) {
      reasons.push(
        "당신은 가공식품을 자주 섭취하지 않는다고 하셨습니다. 로우 푸드 다이어트는 가공식품을 배제하고 생식을 권장하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[grainIndex] <= 1) {
      reasons.push(
        "당신은 통곡물을 즐겨 먹지 않는다고 하셨습니다. 로우 푸드 다이어트는 가공된 곡물을 피하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[vegetableIndex] >= 3 && answers[fruitIndex] >= 3) {
      reasons.push(
        "당신은 채소와 과일을 자주 섭취한다고 하셨습니다. 로우 푸드 다이어트는 생 채소와 과일을 중심으로 하므로, 이러한 식습관과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["로우 푸드 다이어트는 가열하지 않은 생식을 중심으로 한 식단입니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  },

  "존 다이어트": (answers) => {
    const reasons = [];
    const healthConsiderationIndex = questions.indexOf("나는 건강을 고려하여 식단을 계획한다.");
    const proteinIntakeIndex = questions.indexOf("나는 단백질이 풍부한 음식을 자주 섭취한다.");
    const carbIntakeIndex = questions.indexOf("나는 탄수화물이 포함된 음식을 자주 먹는다.");
    const fatPreferenceIndex = questions.indexOf("나는 지방 함량이 적은 음식을 선호한다.");

    if (answers[healthConsiderationIndex] >= 3) {
      reasons.push(
        "당신은 건강을 고려하여 식단을 계획한다고 하셨습니다. 존 다이어트는 호르몬 균형을 맞추기 위해 특정 비율의 영양소를 섭취하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[proteinIntakeIndex] >= 3) {
      reasons.push(
        "당신은 단백질이 풍부한 음식을 자주 섭취한다고 하셨습니다. 존 다이어트는 단백질 섭취를 중요시하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[carbIntakeIndex] >= 3) {
      reasons.push(
        "당신은 탄수화물이 포함된 음식을 자주 먹는다고 하셨습니다. 존 다이어트는 탄수화물 섭취를 적절히 조절하므로, 이러한 식습관과 잘 맞습니다."
      );
    }
    if (answers[fatPreferenceIndex] >= 3) {
      reasons.push(
        "당신은 지방 함량이 적은 음식을 선호한다고 하셨습니다. 존 다이어트는 건강한 지방을 적절히 섭취하므로, 이러한 식이 선호도와 잘 맞습니다."
      );
    }
    if (answers[healthConsiderationIndex] >= 3 && answers[proteinIntakeIndex] >= 3) {
      reasons.push(
        "당신은 건강을 고려하여 식단을 계획하고 단백질 섭취를 선호한다고 하셨습니다. 존 다이어트는 영양소 비율을 맞추어 호르몬 균형을 유지하므로, 이러한 식습관과 잘 맞습니다."
      );
    }

    return reasons.length > 0
      ? reasons
      : ["존 다이어트는 탄수화물, 단백질, 지방을 40:30:30 비율로 섭취하는 식단입니다. 당신의 응답을 종합적으로 분석한 결과, 이 다이어트가 적합하다고 판단되었습니다."];
  }
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { diet, answers } = location.state || {};

  // 페이지 로드 시 최상단으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  // 선택 이유 가져오기
  const reasons = dietSelectionReasons[diet]
    ? dietSelectionReasons[diet](answers)
    : ["추천 이유를 분석할 수 없습니다."];

  return (
    <motion.div
      className="flex flex-col items-center min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold text-green-600 mb-6 sm:mb-8 drop-shadow-md">
        추천 다이어트
      </h2>

      {/* 결과 카드: 버튼을 중앙 정렬하기 위해 flex-col + items-center 적용 */}
      <div className="w-full max-w-3xl bg-white p-4 sm:p-6 rounded-2xl shadow-xl flex flex-col items-center">
        <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-4">
          {diet}
        </h3>
        <p className="text-sm sm:text-base text-gray-700 mb-4">
          {dietDescriptions[diet]}
        </p>

        <div className="mt-4 w-full">
        {/* 헤딩 텍스트 수정 + text-center로 가운데 정렬 */}
  <h4 className="text-lg sm:text-xl font-semibold text-green-600 mb-2 text-center">
    선택 이유
  </h4>
  <ul className="list-none list-inside text-sm sm:text-base text-gray-700 pl-5">
    {reasons.map((reason, index) => (
      <li key={index}>{reason}</li>
    ))}
  </ul>
</div>


        {/* 버튼을 중앙 정렬 */}
        <div className="mt-6 flex justify-center w-full">
          <button
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300"
            onClick={() => navigate("/")}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Result;
