using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace image_uploader_backend.DTOs.FileDTOs
{
    public class FileDTO
    {
        public Stream? File { get; set; }
        public string? FileName { get; set; }
        public string? FileType { get; set; }
        public string? FolderName { get; set; }
    }
}