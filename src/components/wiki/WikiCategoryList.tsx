import * as Styled from "./WikiCategoryListStyle";
import { useState } from "react";
import { Wiki, WikiCategoryProps } from "@/components/wiki/WikiCommonType";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/Io";

const WikiCategoryList = ({
  WiKiList,
  onEntryClick,
  onArrowClick,
  isVisible,
}: WikiCategoryProps) => {
  const firstParentWikiId =
    WiKiList.find((wiki) => !wiki.parentID)?.wikiID || null;
  const [selectedWikiId, setSelectedWikiId] = useState<string | null>(
    firstParentWikiId,
  );
  const [unfoldedWikiIds, setUnfoldedWikiIds] = useState<string[]>([]);

  const handleArrowClick = (wiki: Wiki) => {
    if (unfoldedWikiIds.includes(wiki.wikiID)) {
      setUnfoldedWikiIds((prev) => prev.filter((id) => id !== wiki.wikiID));
    } else {
      setUnfoldedWikiIds((prev) => [...prev, wiki.wikiID]);
    }
    onArrowClick(wiki);
  };

  const handleEntryClickInternal = (wiki: Wiki) => {
    setSelectedWikiId(wiki.wikiID);
    onEntryClick(wiki);
  };

  return (
    <Styled.Wrapper $isVisible={isVisible}>
      <Styled.WikiList>
        {WiKiList.map((wiki) => (
          <Styled.WikiItem
            key={wiki.wikiID}
            onClick={() => handleEntryClickInternal(wiki)}
          >
            {wiki.parentID === "" ? (
              <Styled.ParentWikiWrapper>
                <Styled.WikiTitle selected={wiki.wikiID === selectedWikiId}>
                  {wiki.title}
                </Styled.WikiTitle>
                <Styled.ArrowIcon onClick={() => handleArrowClick(wiki)}>
                  {unfoldedWikiIds.includes(wiki.wikiID) ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </Styled.ArrowIcon>
              </Styled.ParentWikiWrapper>
            ) : (
              <>
                <Styled.DepthSymbol />
                <Styled.WikiTitle selected={wiki.wikiID === selectedWikiId}>
                  {wiki.title}
                </Styled.WikiTitle>
              </>
            )}
          </Styled.WikiItem>
        ))}
      </Styled.WikiList>
    </Styled.Wrapper>
  );
};

export default WikiCategoryList;