/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

function createFolderAndFiles({ folderName, fileName }) {
  // Create folder
  const folderPath = path.join(__dirname, folderName);
  fs.mkdirSync(folderPath);

  // Create controller file
  const controllerContent = `
  import { Request, Response } from 'express';
  import httpStatus from 'http-status';
  import catchAsync from '../../../shared/catchAsync';
  import sendResponse from '../../../shared/sendResponse';
  import { ${folderName} } from '@prisma/client';
  import { ${folderName}Service } from './${folderName.toLowerCase()}.service';

    const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
        const result = await ${folderName}Service.insertIntoDB(req?.body);
          sendResponse<${folderName}>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: '${folderName} create successfully',
            data: result,
          });
    });
    export const ${folderName}Controller={
      insertIntoDB
    }; `;
  const controllerPath = path.join(folderPath, `${fileName}.controller.ts`);
  fs.writeFileSync(controllerPath, controllerContent);

  // Create service file
  const serviceContent = `
  import prisma from '../../../shared/prisma';
  import { Prisma, ${folderName} } from '@prisma/client';
  const insertIntoDB = async (props: ${folderName}) => {
    // database
    const res = await prisma.${folderName.toLowerCase()}.create({
      data: props,
    });
    return res;
  };
  export const ${folderName}Service={
    insertIntoDB
  };
  
  \n`;
  const servicePath = path.join(folderPath, `${fileName}.service.ts`);
  fs.writeFileSync(servicePath, serviceContent);

  // Create route file
  const routeContent = `  
    import express from 'express';
    import validateRequest from '../../middlewares/validateRequest';
    import { ${folderName}Controller } from './${folderName.toLowerCase()}.controller';
    import {${folderName}Validation } from './${folderName.toLowerCase()}.validation';
    const router = express.Router();

    router.post(
      '/create-${folderName.toLowerCase()}',
      // validateRequest(${folderName}Validation.create${folderName.toLowerCase()}),
      ${folderName}Controller.createUser
    );

    export const ${folderName}Routes = router;


  
  `;
  const routePath = path.join(folderPath, `${fileName}.route.ts`);
  fs.writeFileSync(routePath, routeContent);

  // Create route file
  const validationContent = ` 
    import { z } from 'zod';
      const loginUser = z.object({
        body: z.object({
          mobile: z.string({
            required_error: 'Mobile number is required',
          }),
          password: z.string({
            required_error: 'Password is required',
          }),
        }),
      });
      
    export const ${fileName}Validation = {
      loginUser
    };
  `;
  const validationPath = path.join(folderPath, `${fileName}.validation.ts`);
  fs.writeFileSync(validationPath, validationContent);

  // interface route file
  const interfaceContent = ` 
    export type I${folderName}FilterRequest = {
      searchTerm?: string;
    };
    
  `;
  const interfacePath = path.join(folderPath, `${fileName}.interface.ts`);
  fs.writeFileSync(interfacePath, interfaceContent);

  // interface route file
  const constantContent = ` 
  export const ${folderName}SearchAbleFiled = [
    'title',
    'code',
    'startMonth',
    'endMonth',
  ];
  export const ${folderName}FilterAbleFiled = [
    'searchTerm',
    'title',
    'code',
    'startMonth',
    'endMonth',
  ];
  
  `;
  const constantPath = path.join(folderPath, `${fileName}.constant.ts`);
  fs.writeFileSync(constantPath, constantContent);
}

// Extract command line arguments
const [, , folderName, fileName] = process.argv;

if (!folderName || !fileName) {
  console.error('Please provide both folder and file names.');
  process.exit(1);
}

createFolderAndFiles({ folderName, fileName });
