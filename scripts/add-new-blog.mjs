import inquirer from 'inquirer';
import * as fs from 'fs';
import slugify from '@sindresorhus/slugify';

(async () => {
  try {
    const answers = await getAnswers();
    console.log('The answers are: ', answers);
    createBlog(answers)
  } catch (err) {
    console.error(`There was an error while talking to the API: ${err.message}`, err);
  }
})();

function getAnswers() {
    return inquirer.prompt([{
      name: 'title',
      message: 'What is title of the blog',
      type: 'input',
      validate: (title) => {
        if(!title.length) {
          return 'Please provide a title';
        }
        if(title.length <= 3 || title.length > 200) {
          return 'Please provide a title between 4 and 200 characters long';
        }
  
        return true;
      },
      filter: (title) => {
        return title.trim();
      }
    },
    {
      name: 'category',
      message: 'Please select the category of the blog:',
      type: 'checkbox',
      choices: ['tech', 'personal'],
      validate: (options) => {
        if (!options.length) {
          return 'Choose at least one of the above, use space to choose the option'
        }
  
        return true;
      }
    }
  
    ]);
  }


  function createBlog(frontmatter){
    //console.log("frontmatter title", frontmatter.title)
    let path = `./src/content/blogs/${slugify(frontmatter.title)}.mdx`
    let content = blogTemplate(frontmatter)
    fs.writeFile(path, content, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }

  const blogTemplate = (frontmatter) => 
`---
title: ${frontmatter.title}
publishDate: ${new Date().toISOString()}
tags: []
author: abhishek-saha
draft: true
---
                                                                                 
Start writing...

`