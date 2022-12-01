using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace my_new_app.dbModel.Domain;

[Table("User")]
public class User
{
    [Key]
    public int Id { get; set; }
    public string? FullName { get; set; }
    public string? Email { get; set; }
}
