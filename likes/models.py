from django.db import models

# Create your models here.
class Like(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    loop = models.ForeignKey(
        'loops.Loop',
        related_name = "likes",
        on_delete = models.CASCADE
    )
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = "likes",
        on_delete = models.CASCADE
    )

    def __str__(self):
        return f" Like by  {self.owner}, at {self.created_at}, {self.loop}"