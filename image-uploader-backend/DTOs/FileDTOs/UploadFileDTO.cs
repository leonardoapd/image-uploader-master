using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace image_uploader_backend.DTOs.FileDTOs
{
    public record UploadFileDTO
    {
        public IFormFile? File { get; init; }
        public string? FileName { get; init; }
        public string? FileType { get; init; }
        public string? FolderName { get; init; }

    }
}