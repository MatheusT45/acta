import React from 'react'
import { Card } from "react-bootstrap";
import { Romanize } from "../../../helpers"

export const getItemList = (list) => {
    return (list.map((item) => (
        <div style={{textAlign: 'left'}} key={item.id}>
            {item.number}. {item.text}
        </div>
    )))
}

export const getLineList = (list) => {
    return (list.map((line) => (
      <div key={line.id}>
        <div style={{textAlign: 'left'}} key={line.id}>
          {line.letter}) {line.text}
        </div>
        {getItemList(line.items)}
      </div>
    )))
}

export const getInciseList = (list) => {
    return (list.map((incise) => (
      <div key={incise.id}>
        <div style={{textAlign: 'left'}} key={incise.id}>
          {Romanize(incise.number)} - {incise.text}
        </div>
        {getLineList(incise.lines)}
      </div>
    )))
}

export const getParagraphList = (list) => {
    return (list.map((paragraph) => (
      <div key={paragraph.id}>
        <div style={{textAlign: 'left'}} key={paragraph.id}>
          {list.length === 1 
            ? `Parágrafo único - ${paragraph.text}` 
            : `§ ${paragraph.number}º - ${paragraph.text}`
          }
        </div>
        {getInciseList(paragraph.incises)}
        {getLineList(paragraph.lines)}
      </div>
    )))
}

export const getArticleList = (list) => {
    return (list.map((article) => (
      <div key={article.id}>
        <div style={{textAlign: 'left'}} key={article.id}>
        Art. {article.number < 10 ? article.number+'º' : article.number } - {article.text}
        </div>
        {getParagraphList(article.paragraphs)}
        {getInciseList(article.incises)}
        {getLineList(article.lines)}
      </div>
    )))
}

export const getSubSectionList = (list) => {
    return (list.map((subSection) => (
      <div key={subSection.id}>
        <div style={{textAlign: 'left'}} key={subSection.id}>
          Subseção {Romanize(subSection.number)}<br/>
          {subSection.name}
        </div>
        {getArticleList(subSection.articles)}
      </div>
    )))
}

export const getSectionList = (list) => {
    return (list.map((section) => (
      <div key={section.id}>
        <div style={{textAlign: 'center'}} key={section.id}>
          Seção {Romanize(section.number)}<br/>
          {section.name}
        </div>
        {getArticleList(section.articles)}
        {getSubSectionList(section.sub_sections)}
      </div>
    )))
}

export const getChapterList = (list) => {
    return (list.map((chapter) => (
      <div key={chapter.id}>
        <div style={{textAlign: 'center'}} key={chapter.id}>
          Capítulo {chapter.number}<br/> 
          {chapter.name}
        </div>
        {getArticleList(chapter.articles)}
        {getSectionList(chapter.sections)}
      </div>
    )))
}

export const getTitleList = (list) => {
    return (list.map((title) => (
      <div key={title.id}>
        <div style={{textAlign: 'center'}} key={title.id}>
          Título {title.number}<br/>
          {title.name}
        </div>
        {getArticleList(title.articles)}
        {getChapterList(title.chapters)}
      </div>
    )))
}

export const getBookList = (list) => {
    return (list.map((book) => (
      <div key={book.id}>
        <div style={{textAlign: 'center'}} key={book.id}>
          Livro {book.number}<br/> 
          {book.name}
        </div>
        {getTitleList(book.titles)}
      </div>
    )))
}

export const getPartList = (list) => {
    return (list.map((part) => (
      <div key={part.id}>
        <div style={{textAlign: 'center'}} key={part.id}>
          {part.name}
        </div>
        {getBookList(part.books)}
        {getTitleList(part.titles)}
      </div>
    )))
}

export const getSingleRule = (rule) => {
    return (
      <>
        <Card.Title>{ rule.rule_title }</Card.Title>
        <div key={rule.id}>
          { rule.preamble }
        </div>
        {getPartList(rule.parts)}
        {getBookList(rule.books)}
        {getTitleList(rule.titles)}
      </>
    )
}