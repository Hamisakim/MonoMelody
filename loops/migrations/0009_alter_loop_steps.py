# Generated by Django 3.2 on 2021-04-16 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loops', '0008_alter_loop_steps'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loop',
            name='steps',
            field=models.CharField(max_length=500, null=True),
        ),
    ]
