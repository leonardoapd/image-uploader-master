using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using image_uploader_backend.DTOs.FileDTOs;
using image_uploader_backend.Entities;
using image_uploader_backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace image_uploader_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : ControllerBase
    {
        [HttpPost]
        [RequestSizeLimit(1_000_000)]
        public async Task<IActionResult> UploadFile([FromForm] UploadFileDTO uploadFileDTO)
        {
            var file = Request.Form.Files[0];
            Stream fileStream = file.OpenReadStream();
            var folderName = Path.Combine(uploadFileDTO.FolderName);
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName);


                Photo model = new()
                {
                    File = fileStream,
                    FileName = uploadFileDTO.FileName,
                    FileType = uploadFileDTO.FileType,
                    FolderName = uploadFileDTO.FolderName
                };

                var photo = await FireStorageService.UploadFile(model);
                return Ok(photo);

            }
            else
            {
                return BadRequest();
            }
        }

    }
}