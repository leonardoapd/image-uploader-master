using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using image_uploader_backend.Entities;
using Firebase.Auth;
using Firebase.Storage;


namespace image_uploader_backend.Services
{
    public class FireStorageService
    {
        private static readonly string? _apiKey = Environment.GetEnvironmentVariable("API_KEY_STORAGE");
        private static readonly string? _bucket = Environment.GetEnvironmentVariable("BUCKET_NAME");
        private static readonly string? _email = Environment.GetEnvironmentVariable("AUTH_EMAIL");
        private static readonly string? _password = Environment.GetEnvironmentVariable("AUTH_PASSWORD");

        public static StreamContent ConvertBase64ToStream(string imageFromRequest)
        {
            byte[] imageStringToBase64 = Convert.FromBase64String(imageFromRequest);
            StreamContent streamContent = new(new MemoryStream(imageStringToBase64));
            return streamContent;
        }

        public static async Task<string?> UploadFile(Photo photo)
        {
            var auth = new FirebaseAuthProvider(new FirebaseConfig(_apiKey));
            var a = await auth.SignInWithEmailAndPasswordAsync(_email, _password);

            var cancellation = new CancellationTokenSource();

            var task = new FirebaseStorage(
                _bucket,
                new FirebaseStorageOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(a.FirebaseToken),
                    ThrowOnCancel = true
                })
                .Child(photo.FolderName)
                .Child(photo.FileName)
                .PutAsync(photo.File, cancellation.Token);

            try
            {
                string link = await task;
                return link;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception was thrown: {ex}");
                return null;
            }
        }
    }
}
