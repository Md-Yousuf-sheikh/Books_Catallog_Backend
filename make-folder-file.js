/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

function createFolderAndFiles({ folderName, fileName }) {
  // Create folder
  const folderPath = path.join(__dirname, folderName);
  fs.mkdirSync(folderPath);

  // Create controller file
  const controllerContent = `// ${fileName}.controller.tsx\nimport { Request, Response } from 'express';\n
    import httpStatus from 'http-status';\n
    \n \n
    const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
        const result = await ${folderName}.insertIntoDB(req?.body);
          sendResponse<${folderName}>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: '${folderName} create successfully',
            data: result,
          });
    });
    export const ${folderName}Controller={
    }; `;
  const controllerPath = path.join(folderPath, `${fileName}.controller.tsx`);
  fs.writeFileSync(controllerPath, controllerContent);

  // Create service file
  const serviceContent = `// ${fileName}.service.tsx\n// 
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
  const servicePath = path.join(folderPath, `${fileName}.service.tsx`);
  fs.writeFileSync(servicePath, serviceContent);

  // Create route file
  const routeContent = `// ${fileName}.route.tsx\nconsole.log('Route logic for ${fileName}');\n`;
  const routePath = path.join(folderPath, `${fileName}.route.tsx`);
  fs.writeFileSync(routePath, routeContent);

  console.log(`Folder and files created for ${folderName}`);
}

// Extract command line arguments
const [, , folderName, fileName] = process.argv;

if (!folderName || !fileName) {
  console.error('Please provide both folder and file names.');
  process.exit(1);
}

createFolderAndFiles({ folderName, fileName });
