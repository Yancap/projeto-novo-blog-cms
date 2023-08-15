import { useManagement } from '@/context/ManagementContext'
import React from 'react'

interface NavigationProps {
    PublicationsMemo: JSX.Element
    DraftsMemo: JSX.Element
    DisabledMemo: JSX.Element
    AuthorsMemo: JSX.Element
    ArticlesMemo: JSX.Element
}

export const Navigation = ({PublicationsMemo, DraftsMemo, DisabledMemo, AuthorsMemo, ArticlesMemo}: NavigationProps) => {

  const { navigation } = useManagement()
  return (
    <>
        {
            navigation === "" ? PublicationsMemo : 
            navigation === "drafts" ? DraftsMemo: 
            navigation === "disabled" ? DisabledMemo: 
            navigation === "authors" ? AuthorsMemo : 
            navigation === "articles" ? ArticlesMemo : null
        }
    </>
  )
}
